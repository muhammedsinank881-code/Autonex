import {
  createCouponService,
  getAllCouponsService,
  getCouponByIdService,
  updateCouponService,
  deleteCouponService,
  getFeaturedCouponService,
} from "../services/coupon.service.js";

// Create Coupon
export const createCoupon = async (req, res) => {
  try {
    const coupon = await createCouponService(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      data: coupon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Coupons
export const getAllCoupons = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const coupons = await getAllCouponsService(search);

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Coupon By ID
export const getCouponById = async (req, res) => {
  try {
    const coupon = await getCouponByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedCoupon = async (req, res) => {
  try {
    const coupon = await getFeaturedCouponService();

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Coupon
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await updateCouponService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully.",
      data: coupon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Soft Delete Coupon
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await deleteCouponService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully.",
      data: coupon,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
