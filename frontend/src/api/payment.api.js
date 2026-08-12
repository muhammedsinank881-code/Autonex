import API from "./axios";

// Create Razorpay Order
export const createPaymentOrder = async (checkoutId) => {
    const { data } = await API.post("/payments/create-order", {
        checkoutId,
    });

    return data;
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentData) => {
    const { data } = await API.post(
        "/payments/verify",
        paymentData
    );

    return data;
};