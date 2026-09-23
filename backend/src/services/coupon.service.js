import {
  createCoupon,
  findAllCoupons,
  findCouponById,
  findCouponByCode,
  updateCoupon,
  removeFeaturedFromAll,
  softDeleteCoupon,
  findFeaturedCoupon,
  findProductsByIds,
  findCategoriesByIds,
  findBrandsByIds,
} from "../repositories/coupon.repository.js";

// Create Coupon
export const createCouponService = async (data) => {
  const {
    code,
    discountPercentage,
    startDate,
    endDate,
    applyTo,
    categories,
    brands,
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

  if (applyTo === "category" && (!categories || categories.length === 0)) {
    throw new Error("Category is required.");
  }

  if (applyTo === "brand" && (!brands || brands.length === 0)) {
    throw new Error("Brand is required.");
  }

  if (applyTo === "products" && (!products || products.length === 0)) {
    throw new Error("At least one product is required.");
  }

  if (applyTo === "category") {
    const existingCategories = await findCategoriesByIds(categories);

    if (existingCategories.length !== categories.length) {
      throw new Error("One or more categories not found.");
    }
  }

  if (applyTo === "brand") {
    const existingBrands = await findBrandsByIds(brands);

    if (existingBrands.length !== brands.length) {
      throw new Error("One or more brands not found.");
    }
  }

  if (applyTo === "products") {
    const existingProducts = await findProductsByIds(products);

    if (existingProducts.length !== products.length) {
      throw new Error("One or more products not found.");
    }
  }

  const discount = Number(discountPercentage);

  if (isNaN(discount) || discount < 1 || discount > 100) {
    throw new Error("Discount percentage must be between 1 and 100.");
  }

  // If this coupon is featured,
  // remove featured status from all other coupons.
  if (isFeatured === true) {
    await removeFeaturedFromAll();
  }

  return await createCoupon({
    code: code.trim().toUpperCase(),
    discountPercentage: discount,
    startDate: parsedStartDate,
    endDate: parsedEndDate,

    applyTo,

    category: applyTo === "category" ? categories : [],
    brand: applyTo === "brand" ? brands : [],
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

  if (
    data.applyTo !== undefined &&
    !["all", "category", "brand", "products"].includes(data.applyTo)
  ) {
    throw new Error("Invalid coupon target.");
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

  // Handle coupon target
  if (data.applyTo === "all") {
    data.category = [];
    data.brand = [];
    data.products = [];
  }

  if (data.applyTo === "category") {
    if (!data.categories || data.categories.length === 0) {
      throw new Error("Category is required.");
    }

    const existingCategories = await findCategoriesByIds(data.categories);

    if (existingCategories.length !== data.categories.length) {
      throw new Error("One or more categories not found.");
    }

    data.category = data.categories;
    data.brand = [];
    data.products = [];
  }

  if (data.applyTo === "brand") {
    if (!data.brands || data.brands.length === 0) {
      throw new Error("Brand is required.");
    }

    const existingBrands = await findBrandsByIds(data.brands);

    if (existingBrands.length !== data.brands.length) {
      throw new Error("One or more brands not found.");
    }

    data.category = [];
    data.brand = data.brands;
    data.products = [];
  }

  if (data.applyTo === "products") {
    if (!data.products || data.products.length === 0) {
      throw new Error("At least one product is required.");
    }

    const existingProducts = await findProductsByIds(data.products);

    if (existingProducts.length !== data.products.length) {
      throw new Error("One or more products not found.");
    }

    data.category = [];
    data.brand = [];
  }

  delete data.categories;
  delete data.brands;

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
