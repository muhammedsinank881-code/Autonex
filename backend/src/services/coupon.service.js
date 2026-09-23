import {
  createCoupon,
  findAllCoupons,
  findCouponById,
  findCouponByCode,
  updateCoupon,
  removeFeaturedFromAll,
  softDeleteCoupon,
  findFeaturedCoupon,
  findCategoryById,
  findBrandById,
  findProductsByIds,
} from "../repositories/coupon.repository.js";

// Create Coupon
export const createCouponService = async (data) => {
  const {
    code,
    discountPercentage,
    startDate,
    endDate,
    applyTo,
    category,
    brand,
    products,
    isActive,
    isFeatured,
  } = data;

  if (!code || !code.trim()) {
    throw new Error("Coupon code is required.");
  }

  if (discountPercentage === undefined || discountPercentage === null) {
    throw new Error("Discount percentage is required.");
  }

  if (discountPercentage < 1 || discountPercentage > 100) {
    throw new Error("Discount percentage must be between 1 and 100.");
  }

  if (!startDate || !endDate) {
    throw new Error("Start date and end date are required.");
  }

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (parsedStartDate >= parsedEndDate) {
    throw new Error("End date must be after start date.");
  }

  const existingCoupon = await findCouponByCode(code.trim());

  if (existingCoupon) {
    throw new Error("Coupon code already exists.");
  }

  // Validate coupon target
  if (!["all", "category", "brand", "products"].includes(applyTo)) {
    throw new Error("Invalid coupon target.");
  }

  if (applyTo === "category" && !category) {
    throw new Error("Category is required.");
  }

  if (applyTo === "brand" && !brand) {
    throw new Error("Brand is required.");
  }

  if (applyTo === "products" && (!products || products.length === 0)) {
    throw new Error("At least one product is required.");
  }

  if (applyTo === "category") {
    const categoryExists = await findCategoryById(category);

    if (!categoryExists) {
      throw new Error("Category not found.");
    }
  }

  if (applyTo === "brand") {
    const brandExists = await findBrandById(brand);

    if (!brandExists) {
      throw new Error("Brand not found.");
    }
  }

  if (applyTo === "products") {
    const existingProducts = await findProductsByIds(products);

    if (existingProducts.length !== products.length) {
      throw new Error("One or more products not found.");
    }
  }

  // If this coupon is featured,
  // remove featured status from all other coupons.
  if (isFeatured === true) {
    await removeFeaturedFromAll();
  }

  return await createCoupon({
    code: code.trim().toUpperCase(),
    discountPercentage: Number(discountPercentage),
    startDate: parsedStartDate,
    endDate: parsedEndDate,

    applyTo,

    category: applyTo === "category" ? category : null,
    brand: applyTo === "brand" ? brand : null,
    products: applyTo === "products" ? products : [],

    isActive: isActive ?? true,
    isFeatured: isFeatured ?? false,
  });
};

// Get All Coupons
export const getAllCouponsService = async (search = "") => {
  return await findAllCoupons(search.trim());
};

// Get Coupon By ID
export const getCouponByIdService = async (id) => {
  const coupon = await findCouponById(id);

  if (!coupon) {
    throw new Error("Coupon not found.");
  }

  return coupon;
};

export const getFeaturedCouponService = async () => {
  return await findFeaturedCoupon();
};

// Update Coupon
export const updateCouponService = async (id, data) => {
  const coupon = await findCouponById(id);

  if (!coupon) {
    throw new Error("Coupon not found.");
  }

  // Check duplicate coupon code
  if (data.code) {
    data.code = data.code.trim().toUpperCase();

    if (data.code !== coupon.code) {
      const existingCoupon = await findCouponByCode(data.code);

      if (existingCoupon && existingCoupon._id.toString() !== id) {
        throw new Error("Coupon code already exists.");
      }
    }
  }

  // Validate discount
  if (data.discountPercentage !== undefined) {
    const discount = Number(data.discountPercentage);

    if (discount < 1 || discount > 100) {
      throw new Error("Discount percentage must be between 1 and 100.");
    }

    data.discountPercentage = discount;
  }

  // Validate dates
  const startDate = data.startDate
    ? new Date(data.startDate)
    : coupon.startDate;

  const endDate = data.endDate ? new Date(data.endDate) : coupon.endDate;

  if (startDate >= endDate) {
    throw new Error("End date must be after start date.");
  }

  if (data.startDate) {
    data.startDate = startDate;
  }

  if (data.endDate) {
    data.endDate = endDate;
  }

  // Products
  if (data.products !== undefined) {
    data.products = data.products;
  }

  // Active status
  if (data.isActive !== undefined) {
    data.isActive = Boolean(data.isActive);
  }

  // Featured status
  if (data.isFeatured !== undefined) {
    data.isFeatured = Boolean(data.isFeatured);

    if (data.isFeatured === true) {
      await removeFeaturedFromAll(id);
    }
  }

  return await updateCoupon(id, data);
};

// Soft Delete Coupon
export const deleteCouponService = async (id) => {
  const coupon = await softDeleteCoupon(id);

  if (!coupon) {
    throw new Error("Coupon not found.");
  }

  return coupon;
};
