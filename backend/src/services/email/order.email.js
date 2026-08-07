import { sendEmail } from "./email.service.js";
import { baseTemplate } from "./baseTemplate.js";

export const sendOrderConfirmationEmail = async (order) => {
    const html = baseTemplate({

        title: "Order Confirmation",

        heading: `Hello ${order.shippingAddress.fullName},`,

        content: `
            <p>
                Your order has been placed successfully.
            </p>

            <hr>

            <p>
                <strong>Order Number:</strong>
                ${order.orderNumber}
            </p>

            <p>
                <strong>Total:</strong>
                ₹${order.totalAmount}
            </p>

            <p>
                <strong>Status:</strong>
                ${order.orderStatus}
            </p>

            <p>
                We will notify you once your order is shipped.
            </p>
        `,
    });

    try {
        await sendEmail({
            to: order.user.email,
            name: order.shippingAddress.fullName,
            subject: `Order ${order.orderNumber} Confirmed`,
            html,
        });
    } catch (error) {
        console.error(error);
    }
};