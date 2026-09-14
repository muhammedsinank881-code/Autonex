import { sendWhatsAppMessage } from "./whatsapp.service.js";

export const sendOrderStatusWhatsApp = async ({
    order,
    message,
}) => {
    const phone = order.shippingAddress.phone;

    const whatsappMessage = `
Hello ${order.shippingAddress.fullName} 👋

Order: ${order.orderNumber}

${message}

Thank you for shopping with us! ❤️
`;

    await sendWhatsAppMessage(phone, whatsappMessage);
};