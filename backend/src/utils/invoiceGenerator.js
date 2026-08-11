import PDFDocument from "pdfkit";

export const generateInvoice = (order, res) => {
    // 80mm = ~226.77 points in PDFKit
    const receiptWidth = 226.77;
    const margin = 12;
    const printableWidth = receiptWidth - margin * 2;

    // Estimate page height dynamically based on item count to keep it single-page
    const baseHeight = 350;
    const itemHeight = 35;
    const totalHeight = baseHeight + (order.items?.length || 0) * itemHeight;

    const doc = new PDFDocument({
        margin: margin,
        size: [receiptWidth, totalHeight],
    });

    // Response Headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `inline; filename=invoice-${order.orderNumber}.pdf`
    );

    doc.pipe(res);

    // Helper: Draw horizontal divider line
    const drawDivider = () => {
        doc.moveDown(0.3);
        doc.fontSize(8).font("Courier").text("-".repeat(38), { align: "center" });
        doc.moveDown(0.3);
    };

    // Helper: Two-column key/value row
    const drawRow = (leftText, rightText, isBold = false) => {
        const font = isBold ? "Courier-Bold" : "Courier";
        doc.font(font).fontSize(8);

        const y = doc.y;
        doc.text(leftText, margin, y, { width: printableWidth - 60, align: "left" });
        doc.text(rightText, margin, y, { width: printableWidth, align: "right" });
    };

    // --- Header ---
    doc.font("Helvetica-Bold").fontSize(16).text("AUTONEX", { align: "center" });
    doc.font("Helvetica").fontSize(8).text("TAX INVOICE", { align: "center" });

    drawDivider();

    // --- Order Meta ---
    doc.font("Courier").fontSize(8);
    doc.text(`Date : ${new Date().toLocaleDateString()}`);
    doc.text(`Order: #${order.orderNumber}`);
    doc.text(`Status: ${order.orderStatus} / ${order.paymentStatus}`);
    doc.text(`Pay Via: ${order.paymentMethod}`);

    drawDivider();

    // --- Customer & Shipping ---
    doc.font("Courier-Bold").fontSize(8).text("DELIVER TO:");
    doc.font("Courier").fontSize(8);
    doc.text(order.shippingAddress.fullName);
    doc.text(order.shippingAddress.phone);
    doc.text(
        `${order.shippingAddress.addressLine1}${order.shippingAddress.addressLine2 ? ", " + order.shippingAddress.addressLine2 : ""
        }`
    );
    doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}`);

    drawDivider();

    // --- Product List Header ---
    drawRow("ITEM", "PRICE");
    drawDivider();

    // --- Items ---
    order.items.forEach((item) => {
        doc.font("Courier-Bold").fontSize(8).text(item.name, { width: printableWidth });

        const qtyPrice = `${item.quantity} x RS.${item.price}`;
        const subtotal = `RS.${item.subtotal}`;

        drawRow(`  ${qtyPrice}`, subtotal);
        doc.moveDown(0.2);
    });

    drawDivider();

    // --- Totals Section ---
    drawRow("Subtotal", `RS.${order.subtotal}`);
    drawRow("Shipping Charge", `RS.${order.shippingCharge}`);
    drawRow("Discount", `-RS.${order.discount}`);

    drawDivider();

    drawRow("TOTAL AMOUNT", `RS.${order.totalAmount}`, true);

    drawDivider();

    // --- Footer ---
    doc.moveDown(0.5);
    doc.font("Helvetica-Oblique").fontSize(8).text("Thank you for shopping with Autonex!", {
        align: "center",
    });

    doc.end();
};