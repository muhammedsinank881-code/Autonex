import API from "./axios";

export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);

  return data;
};

export const getMyOrders = async () => {
  const { data } = await API.get("/orders/me");

  return data;
};

export const getOrderById = async (orderId) => {
  const { data } = await API.get(`/orders/${orderId}`);

  return data;
};

export const getAllOrders = async () => {
  const { data } = await API.get("/orders");

  return data;
};

export const updateOrderStatus = async ({ orderId, status }) => {
  const { data } = await API.patch(
    `/orders/${orderId}/status`,
    { status }
  );

  return data;
};

export const cancelOrder = async (orderId) => {
  const { data } = await API.patch(
    `/orders/${orderId}/cancel`
  );

  return data;
};

export const downloadInvoice = async (orderId) => {
  const response = await API.get(
    `/orders/${orderId}/invoice`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};