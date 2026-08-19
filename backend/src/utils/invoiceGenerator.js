import PDFDocument from "pdfkit";

export const generateInvoice = (order, res) => {
  // Standard 80mm thermal receipt paper dimensions
  const PAGE_WIDTH = 226; // ~80mm width in points
  const MARGIN = 10;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

  const doc = new PDFDocument({
    margin: MARGIN,
    size: [PAGE_WIDTH, 600], // Height auto-adjusts nicely on continuous paper
  });

  // Response Headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=invoice-${order.orderNumber}.pdf`
  );

  doc.pipe(res);

  // --- BRAND HEADER ---
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("AUTONEX", { align: "center", width: CONTENT_WIDTH });

  doc.moveDown(0.8);

  // --- METADATA SECTION ---
  const addMetaRow = (label, value) => {
    const y = doc.y;
    doc
      .font("Helvetica")
      .fontSize(8)
      .text(`${label}:`, MARGIN, y);

    doc
      .font("Helvetica")
      .fontSize(8)
      .text(value, MARGIN + 50, y, { width: CONTENT_WIDTH - 50, align: "left" });

    doc.moveDown(0.3);
  };

  addMetaRow("Date", new Date().toLocaleDateString());
  addMetaRow("Order", order.orderNumber);
  addMetaRow("Status", order.orderStatus?.toUpperCase() || "PAID");
  addMetaRow("Pay Via", `: ${order.paymentMethod?.toUpperCase() || "RAZORPAY"}`);

  doc.moveDown(0.6);

  // --- SHIPPING / ADDRESS ---
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text("TAX INVOICE");

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .text("DELIVER TO:");

  doc.font("Helvetica").fontSize(8);
  doc.text(order.shippingAddress.fullName);
  doc.text(order.shippingAddress.phone);
  doc.text(order.shippingAddress.addressLine1);
  if (order.shippingAddress.addressLine2) {
    doc.text(order.shippingAddress.addressLine2);
  }
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`);
  doc.text(`${order.shippingAddress.postalCode}`);

  doc.moveDown(0.6);

  // --- ITEMS HEADER ---
  const headerY = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .text("ITEM", MARGIN, headerY);

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .text("PRICE", MARGIN, headerY, { width: CONTENT_WIDTH, align: "right" });

  doc.moveDown(0.3);

  // Separator Line
  doc
    .moveTo(MARGIN, doc.y)
    .lineTo(PAGE_WIDTH - MARGIN, doc.y)
    .strokeColor("#999999")
    .lineWidth(0.5)
    .stroke();

  doc.moveDown(0.5);

  // --- ITEMS LIST ---
  order.items.forEach((item) => {
    const itemY = doc.y;

    // Item Title
    doc
      .font("Helvetica")
      .fontSize(8)
      .text(item.name, MARGIN, itemY, { width: CONTENT_WIDTH - 50 });

    // Unit Price Breakout
    doc
      .font("Helvetica")
      .fontSize(7)
      .text(`${item.quantity} x RS.${item.price}`, MARGIN, doc.y);

    // Line Subtotal Right Aligned
    doc
      .font("Helvetica")
      .fontSize(8)
      .text(`RS.${item.subtotal}`, MARGIN, itemY, {
        width: CONTENT_WIDTH,
        align: "right",
      });

    doc.moveDown(0.5);
  });

  doc.moveDown(0.3);

  // --- TOTALS BREAKDOWN ---
  const addTotalRow = (label, value, isBold = false) => {
    const y = doc.y;
    doc
      .font(isBold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(8)
      .text(label, MARGIN, y);

    doc
      .font(isBold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(8)
      .text(value, MARGIN, y, { width: CONTENT_WIDTH, align: "right" });

    doc.moveDown(0.4);
  };

  addTotalRow("Subtotal", `RS.${order.subtotal}`);
  addTotalRow("Shipping Charge", `RS.${order.shippingCharge || 0}`);
  addTotalRow("Discount", `-RS.${order.discount || 0}`);

  doc.moveDown(0.2);
  addTotalRow("TOTAL AMOUNT", `RS.${order.totalAmount}`, true);

  doc.moveDown(1);

  // --- FOOTER ---
  doc
    .font("Helvetica")
    .fontSize(8)
    .text("Thank you for shopping with Autonex!", {
      align: "center",
      width: CONTENT_WIDTH,
    });

  doc.end();
};