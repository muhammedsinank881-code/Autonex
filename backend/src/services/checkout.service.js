import Cart from "../models/Cart.js";
import Checkout from "../models/Checkout.js";
import { findCouponByCode } from "../repositories/coupon.repository.js";

const SHIPPING_CHARGE = Number(process.env.SHIPPING_CHARGE || 80);
const FREE_SHIPPING_LIMIT = Number(process.env.FREE_SHIPPING_LIMIT || 1000);
const GST_PERCENT = Number(process.env.GST_PERCENT || 18);

export const checkoutService = async (userId, body) => {
  const { paymentMethod, couponCode, shippingAddress } = body;

  // Payment Validation

  const allowedPayments = ["COD", "RAZORPAY"];

  if (!allowedPayments.includes(paymentMethod)) {
    throw new Error("Choose a payment method");
  }

  // Address

  if (
    !shippingAddress ||
    !shippingAddress.fullName ||
    !shippingAddress.phone ||
    !shippingAddress.addressLine1 ||
    !shippingAddress.city ||
    !shippingAddress.state ||
    !shippingAddress.postalCode ||
    !shippingAddress.country
  ) {
    throw new Error("Shipping address is required");
  }
  // Cart

  const cart = await Cart.findOne({
    userId,
  }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Price Calculation

  let subtotal = 0;

  const items = [];

  for (const item of cart.items) {
    const product = item.productId;

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.isActive) {
      throw new Error(`${product.name} is unavailable`);
    }

    let price;
    let stock;

    if (item.variantId) {
      const variant = product.variants.id(item.variantId);

      if (!variant) {
        throw new Error("Variant not found");
      }

      stock = variant.stock;

      price = variant.discountPrice > 0 ? variant.discountPrice : variant.price;
    } else {
      stock = product.stock;

      price = product.discountPrice > 0 ? product.discountPrice : product.price;
    }

    if (stock < item.quantity) {
      throw new Error(`${product.name} is out of stock`);
    }

    const itemSubtotal = price * item.quantity;

    subtotal += itemSubtotal;

    items.push({
      productId: product._id,
      variantId: item.variantId,
      name: product.name,
      image: product.images[0]?.url || "",
      quantity: item.quantity,
      price,
      subtotal: itemSubtotal,
    });
  }

  // Shipping

  const shipping = subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;

  // GST

  const tax = Number(((subtotal * GST_PERCENT) / 100).toFixed(2));

  // Coupon

  let discount = 0;
  let appliedCoupon = null;

  if (couponCode && couponCode.trim() !== "") {
    const coupon = await findCouponByCode(couponCode.trim().toUpperCase());

    if (!coupon) {
      throw new Error("Invalid coupon code");
    }

    // Active check
    if (!coupon.isActive) {
      throw new Error("Coupon is currently inactive");
    }

    // Date check
    const now = new Date();

    if (now < coupon.startDate) {
      throw new Error("Coupon is not active yet");
    }

    if (now > coupon.endDate) {
      throw new Error("Coupon has expired");
    }

    // Calculate discount only for eligible products
    let eligibleAmount = 0;

    for (const item of items) {
      const isEligible = coupon.products.some(
        (productId) => productId.toString() === item.productId.toString(),
      );

      if (isEligible) {
        eligibleAmount += item.subtotal;
      }
    }

    if (eligibleAmount > 0) {
      discount = Number(
        ((eligibleAmount * coupon.discountPercentage) / 100).toFixed(2),
      );

      appliedCoupon = {
        couponId: coupon._id,
        code: coupon.code,
        percentage: coupon.discountPercentage,
        discount,
      };
    } else {
      discount = 0;
      appliedCoupon = null;
    }
  }

  // Total

  const total = subtotal + shipping - discount;

  // Return

  // Find existing checkout for this user
  let checkout = await Checkout.findOne({
    user: userId,
  });

  // create a completely new checkout
  if (checkout && checkout.checkoutStatus === "COMPLETED") {
    checkout = null;
  }

  // Create a new checkout
  if (!checkout) {
    checkout = await Checkout.create({
      user: userId,
      items,
      shippingAddress,
      payment: {
        method: paymentMethod,
        status: "PENDING",
      },
      coupon: appliedCoupon,
      summary: {
        subtotal,
        shipping,
        tax,
        discount,
        total,
      },
      checkoutStatus: "ACTIVE",
    });
  } else {
    // Update existing unfinished checkout
    checkout.items = items;
    checkout.shippingAddress = shippingAddress;

    checkout.payment = {
      method: paymentMethod,
      status: "PENDING",
    };

    checkout.coupon = appliedCoupon;

    checkout.summary = {
      subtotal,
      shipping,
      tax,
      discount,
      total,
    };

    checkout.checkoutStatus = "ACTIVE";

    await checkout.save();
  }

  return {
    success: true,

    nextStep: paymentMethod === "RAZORPAY" ? "PAYMENT" : "CREATE_ORDER",

    checkout,
  };
};
