import PDFDocument from "pdfkit";

export const generateInvoice = (order, res) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
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
    .fontSize(22)
    .text("AUTONEX", { align: "center" });
  doc.moveDown(1.5);

  // --- ORDER & INVOICE DETAILS (Two-Column Layout) ---
  const detailsTop = doc.y;
  const leftColX = 50;
  const rightColX = 180;

  const addDetailRow = (label, value) => {
    const y = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(label, leftColX, y);
    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`: ${value}`, rightColX, y);
    doc.moveDown(0.4);
  };

  addDetailRow("Date", new Date().toLocaleDateString());
  addDetailRow("Order", order.orderNumber);
  addDetailRow("Status", order.orderStatus?.toUpperCase() || "PAID");
  addDetailRow("Pay Via", order.paymentMethod?.toUpperCase() || "RAZORPAY");

  doc.moveDown(1.5);

  // --- SHIPPING ADDRESS ---
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("TAX INVOICE");
  doc.text("DELIVER TO:", { underline: true });
  doc.moveDown(0.3);

  doc.font("Helvetica").fontSize(10);
  doc.text(order.shippingAddress.fullName);
  doc.text(order.shippingAddress.phone);
  doc.text(order.shippingAddress.addressLine1);
  if (order.shippingAddress.addressLine2) {
    doc.text(order.shippingAddress.addressLine2);
  }
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`);
  doc.text(`${order.shippingAddress.postalCode}`);

  doc.moveDown(1.5);

  // --- PRODUCT TABLE HEADER ---
  const tableTop = doc.y;
  const col1X = 50;  // Item Name
  const col2X = 380; // Qty x Unit Price
  const col3X = 480; // Subtotal

  doc.font("Helvetica-Bold").fontSize(10);
  doc.text("ITEM", col1X, tableTop);
  doc.text("PRICE", col3X, tableTop, { align: "right" });

  // Divider Line
  doc
    .moveTo(col1X, tableTop + 15)
    .lineTo(545, tableTop + 15)
    .strokeColor("#cccccc")
    .lineWidth(1)
    .stroke();

  let position = tableTop + 25;

  // --- PRODUCT ITEMS ---
  order.items.forEach((item) => {
    doc.font("Helvetica").fontSize(10);
    doc.text(item.name, col1X, position);

    // Qty x Price details on next line under item name
    doc
      .fontSize(9)
      .fillColor("#555555")
      .text(`${item.quantity} x RS.${item.price}`, col1X, position + 14);

    // Total for line
    doc
      .fontSize(10)
      .fillColor("#000000")
      .text(`RS.${item.subtotal}`, col3X, position, { align: "right" });

    position += 35;
  });

  // Divider Line
  doc
    .moveTo(col1X, position)
    .lineTo(545, position)
    .strokeColor("#cccccc")
    .lineWidth(1)
    .stroke();

  position += 15;

  // --- TOTALS SECTION ---
  const addTotalRow = (label, value, isBold = false) => {
    doc
      .font(isBold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(10)
      .text(label, col1X, position);
    doc
      .text(`RS.${value}`, col3X, position, { align: "right" });
    position += 18;
  };

  addTotalRow("Subtotal", order.subtotal);
  addTotalRow("Shipping Charge", order.shippingCharge || 0);
  addTotalRow("Discount", order.discount ? `-${order.discount}` : "-0");

  position += 5;
  addTotalRow("TOTAL AMOUNT", order.totalAmount, true);

  // --- FOOTER ---
  doc.moveDown(3);
  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Thank you for shopping with Autonex!", {
      align: "center",
    });

  doc.end();
};