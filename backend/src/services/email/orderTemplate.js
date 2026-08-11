export const orderTemplate = (order, message) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333;">

            <p style="font-size: 14px; line-height: 1.6;">
                ${message}
            </p>

            <div style="
                margin-top: 20px;
                padding: 20px;
                background-color: #f8f9fa;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
            ">

                <h3 style="
                    margin-top: 0;
                    color: #0066b2;
                ">
                    Order Details
                </h3>

                <p>
                    <strong>Order Number:</strong>
                    ${order.orderNumber}
                </p>

                <p>
                    <strong>Payment Method:</strong>
                    ${order.paymentMethod}
                </p>

                <p>
                    <strong>Payment Status:</strong>
                    ${order.paymentStatus}
                </p>

                <p>
                    <strong>Order Status:</strong>
                    ${order.orderStatus}
                </p>

                <p>
                    <strong>Total Amount:</strong>
                    ₹${order.totalAmount}
                </p>

            </div>

            <div style="
                margin-top: 20px;
                padding: 15px;
                border-top: 1px solid #e5e7eb;
            ">

                <h3 style="color: #333;">
                    Shipping Address
                </h3>

                <p style="line-height: 1.6;">
                    ${order.shippingAddress.fullName}<br/>
                    ${order.shippingAddress.addressLine1}<br/>
                    ${order.shippingAddress.addressLine2 || ""}<br/>
                    ${order.shippingAddress.city},
                    ${order.shippingAddress.state}<br/>
                    ${order.shippingAddress.postalCode}<br/>
                    ${order.shippingAddress.country}
                </p>

            </div>

        </div>
    `;
};