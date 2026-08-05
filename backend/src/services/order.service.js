import mongoose from "mongoose";
import Checkout from "../models/Checkout.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const createOrder = async (
    checkoutId,
    paymentDetails
) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        // Find Checkout

        const checkout = await Checkout.findById(checkoutId).session(session);

        if (!checkout) {
            throw new Error("Checkout not found");

        }

        const existingOrder = await Order.findOne({
            checkout: checkout._id
        }).session(session);

        if (existingOrder) {
            throw new Error("Order already exists");
        }

        if (checkout.checkoutStatus === "COMPLETED") {
            throw new Error("Order already created");
        }

        const isCOD = checkout.payment.method === "COD";

        if (!isCOD && checkout.payment.status !== "PAID") {
            throw new Error("Payment is not completed");
        }

        if (checkout.expiresAt < new Date()) {
            throw new Error("Checkout session has expired");
        }

        // Validate Stock

        for (const item of checkout.items) {
            const product = await Product.findById(item.productId).session(session);

            if (!product) {
                throw new Error(`${item.name} not found`);
            }

            if (!product.isActive) {
                throw new Error(`${product.name} is unavailable`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`${item.name} is out of stock`);
            }
        }

        // Reduce Inventory

        for (const item of checkout.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                {
                    $inc: {
                        stock: -item.quantity,
                        totalSold: item.quantity,
                    },
                },
                { session }
            );
        }

        // Create Order
        const orderStatus = isCOD
            ? "PLACED"
            : "CONFIRMED";

        const order = await Order.create(
            [
                {
                    user: checkout.user,

                    checkout: checkout._id,

                    orderNumber: generateOrderNumber(),

                    items: checkout.items,

                    shippingAddress: checkout.shippingAddress,

                    paymentMethod: checkout.payment.method,

                    paymentStatus: isCOD
                        ? "PENDING"
                        : "PAID",

                    payment: isCOD
                        ? {}
                        : {
                            razorpayOrderId: paymentDetails.razorpayOrderId,
                            razorpayPaymentId: paymentDetails.razorpayPaymentId,
                            razorpaySignature: paymentDetails.razorpaySignature,
                        },

                    subtotal: checkout.summary.subtotal,

                    shippingCharge: checkout.summary.shipping,

                    tax: checkout.summary.tax,

                    discount: checkout.summary.discount,

                    totalAmount: checkout.summary.total,

                    orderStatus,
                },
            ],
            { session }
        );

        // Update Checkout

        checkout.checkoutStatus = "COMPLETED";
        if (!isCOD) {
            checkout.payment.status = "PAID";
        }

        await checkout.save({ session });

        // Clear Cart

        await Cart.findOneAndUpdate(
            { userId: checkout.user },
            {
                items: [],
                totalPrice: 0,
                totalQuantity: 0,
                discountPrice: 0,
            },
            { session }
        );

        await session.commitTransaction();
        await session.endSession();

        return order[0];
    } catch (error) {
        await session.abortTransaction();

        session.endSession();

        throw error;
    }
};