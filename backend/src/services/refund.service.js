import razorpay from "../config/razorpay.js";

export const refundPayment = async (paymentId, amount) => {
    try {
        const refund = await razorpay.payments.refund(paymentId, {
            amount, 
        });

        return refund;
    } catch (error) {
        throw new Error( 
            error.error?.description || "Refund failed"
        );
    }
};