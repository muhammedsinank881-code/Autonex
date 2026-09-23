import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import Coupon from "../models/Coupon.js";
import Product from "../models/Product.js";

// Create
export const createCoupon = async (data) => {
  return await Coupon.create(data);
};

// Get all
export const findAllCoupons = async (search = "") => {
  const query = {
    isDeleted: false,
  };

  if (search) {
    const conditions = [
      {
        code: {
          $regex: search,
          $options: "i",
        },
      },
    ];

    const percentage = Number(search);

    if (!Number.isNaN(percentage)) {
      conditions.push({
        discountPercentage: percentage,
      });
    }

    query.$or = conditions;
  }

  return await Coupon.find(query)
    .populate("products", "name sku images")
    .sort({ createdAt: -1 });
};

// Get by ID
export const findCouponById = async (id) => {
  return await Coupon.findOne({
    _id: id,
    isDeleted: false,
  }).populate("products", "name sku images");
};

// Find by code
export const findCouponByCode = async (code) => {
  return await Coupon.findOne({
    code: code.toUpperCase(),
    isDeleted: false,
  });
};

export const findFeaturedCoupon = async () => {
  const now = new Date();

  return await Coupon.findOne({
    isFeatured: true,
    isActive: true,
    isDeleted: false,
    startDate: { $lte: now },
    endDate: { $gte: now },
  }).select("code discountPercentage startDate endDate");
};

// Remove featured status from all other coupons
export const removeFeaturedFromAll = async (couponId = null) => {
  const query = {
    isDeleted: false,
  };

  if (couponId) {
    query._id = { $ne: couponId };
  }

  return await Coupon.updateMany(query, {
    $set: {
      isFeatured: false,
    },
  });
};

// Update
export const updateCoupon = async (id, data) => {
  return await Coupon.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  ).populate("products", "name sku images");
};

// Soft delete
export const softDeleteCoupon = async (id) => {
  return await Coupon.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      isDeleted: true,
      isActive: false,
      isFeatured: false,
    },
    {
      new: true,
    },
  );
};

export const findCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

export const findBrandById = async (brandId) => {
  return await Brand.findById(brandId);
};

export const findProductsByIds = async (productIds) => {
  return await Product.find({
    _id: { $in: productIds },
  });
};
