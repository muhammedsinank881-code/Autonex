import PDFDocument from "pdfkit";

export const generateInvoice = (order, res) => {
  // 80mm width receipt paper (~226 points)
  const TICKET_WIDTH = 226;
  const MARGIN = 10;
  const PRINTABLE_WIDTH = TICKET_WIDTH - MARGIN * 2;

  const doc = new PDFDocument({
    margin: MARGIN,
    size: [TICKET_WIDTH, 600], // Adjust height dynamically if needed or set estimated length
  });

  // Response Headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=invoice-${order.orderNumber}.pdf`
  );

  doc.pipe(res);

  // --- HEADER SECTION ---
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("AUTONEX", { align: "center", width: PRINTABLE_WIDTH });
  doc.moveDown(0.8);

  // Helper for key-value details
  const addDetailRow = (label, value) => {
    const y = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .text(`${label}:`, MARGIN, y, { width: 60 });
    doc
      .font("Helvetica")
      .fontSize(8)
      .text(value, MARGIN + 60, y, { width: PRINTABLE_WIDTH - 60 });
  };

  addDetailRow("Date", new Date().toLocaleDateString());
  addDetailRow("Order", order.orderNumber);
  addDetailRow("Status", order.orderStatus?.toUpperCase() || "PAID");
  addDetailRow("Pay Via", order.paymentMethod?.toUpperCase() || "RAZORPAY");

  doc.moveDown(0.8);

  // Divider Line
  doc
    .moveTo(MARGIN, doc.y)
    .lineTo(TICKET_WIDTH - MARGIN, doc.y)
    .strokeColor("#000000")
    .lineWidth(0.5)
    .stroke();

  doc.moveDown(0.5);

  // --- SHIPPING ADDRESS ---
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text("TAX INVOICE");
  doc.text("DELIVER TO:");
  doc.moveDown(0.2);

  doc.font("Helvetica").fontSize(8);
  doc.text(order.shippingAddress.fullName, { width: PRINTABLE_WIDTH });
  doc.text(order.shippingAddress.phone, { width: PRINTABLE_WIDTH });
  doc.text(order.shippingAddress.addressLine1, { width: PRINTABLE_WIDTH });
  if (order.shippingAddress.addressLine2) {
    doc.text(order.shippingAddress.addressLine2, { width: PRINTABLE_WIDTH });
  }
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`, {
    width: PRINTABLE_WIDTH,
  });
  doc.text(`${order.shippingAddress.postalCode}`, { width: PRINTABLE_WIDTH });

  doc.moveDown(0.8);

  // Divider Line
  doc
    .moveTo(MARGIN, doc.y)
    .lineTo(TICKET_WIDTH - MARGIN, doc.y)
    .strokeColor("#000000")
    .lineWidth(0.5)
    .stroke();

  doc.moveDown(0.5);

  // --- PRODUCT TABLE HEADER ---
  const tableHeaderY = doc.y;

  doc.font("Helvetica-Bold").fontSize(8);
  doc.text("ITEM", MARGIN, tableHeaderY);
  doc.text("PRICE", MARGIN, tableHeaderY, {
    width: PRINTABLE_WIDTH,
    align: "right",
  });

  doc.moveDown(0.3);

  // --- PRODUCT ITEMS ---
  order.items.forEach((item) => {
    const itemY = doc.y;

    doc.font("Helvetica").fontSize(8);
    // Item Name
    doc.text(item.name, MARGIN, itemY, { width: PRINTABLE_WIDTH - 60 });

    // Total Price on Right
    doc.text(`RS.${item.subtotal}`, MARGIN, itemY, {
      width: PRINTABLE_WIDTH,
      align: "right",
    });

    // Qty x Unit Price under name
    doc
      .fontSize(7)
      .fillColor("#444444")
      .text(`${item.quantity} x RS.${item.price}`, MARGIN, doc.y);

    doc.fillColor("#000000");
    doc.moveDown(0.4);
  });

  // Divider Line
  doc
    .moveTo(MARGIN, doc.y)
    .lineTo(TICKET_WIDTH - MARGIN, doc.y)
    .strokeColor("#000000")
    .lineWidth(0.5)
    .stroke();

  doc.moveDown(0.5);

  // --- TOTALS SECTION ---
  const addTotalRow = (label, value, isBold = false) => {
    const y = doc.y;
    doc
      .font(isBold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(8)
      .text(label, MARGIN, y);
    doc.text(`RS.${value}`, MARGIN, y, {
      width: PRINTABLE_WIDTH,
      align: "right",
    });
    doc.moveDown(0.3);
  };

  addTotalRow("Subtotal", order.subtotal);
  addTotalRow("Shipping Charge", order.shippingCharge || 0);
  addTotalRow("Discount", order.discount ? `-${order.discount}` : "-0");

  doc.moveDown(0.2);
  addTotalRow("TOTAL AMOUNT", order.totalAmount, true);

  doc.moveDown(1);

  // --- FOOTER ---
  doc
    .font("Helvetica")
    .fontSize(8)
    .text("Thank you for shopping with Autonex!", {
      align: "center",
      width: PRINTABLE_WIDTH,
    });

  doc.end();
};