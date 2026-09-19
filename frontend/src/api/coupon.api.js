import API from "./axios";

// GET /api/coupons
export const getCoupons = async () => {
  const { data } = await API.get("/coupons");
  return data;
};

// GET /api/coupons/featured
export const getFeaturedCoupon = async () => {
  const { data } = await API.get("/coupons/featured");
  return data;
};

// GET /api/coupons/:id
export const getCouponById = async (id) => {
  const { data } = await API.get(`/coupons/${id}`);
  return data;
};

// POST /api/coupons
export const createCoupon = async (couponData) => {
  const { data } = await API.post("/coupons", couponData);
  return data;
};

// PUT /api/coupons/:id
export const updateCoupon = async (id, couponData) => {
  const { data } = await API.put(`/coupons/${id}`, couponData);
  return data;
};

// DELETE /api/coupons/:id
export const deleteCoupon = async (id) => {
  const { data } = await API.delete(`/coupons/${id}`);
  return data;
};
