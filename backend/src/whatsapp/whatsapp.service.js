import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestWaWebVersion,
} from "@whiskeysockets/baileys";

import QRCode from "qrcode";

let whatsappSocket = null;

export const startWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("./whatsapp-auth");

  const { version } = await fetchLatestWaWebVersion();

  const socket = makeWASocket({
    auth: state,
    version, 
  });

  whatsappSocket = socket;

  return new Promise((resolve) => {
    // Save WhatsApp credentials
    socket.ev.on("creds.update", saveCreds);

    socket.ev.on(
      "connection.update",
      async ({ connection, qr, lastDisconnect }) => {
        // QR CODE
        if (qr) {
          console.log("\n📱 Scan this WhatsApp QR:\n");

          console.log(
            await QRCode.toString(qr, {
              type: "terminal",
              small: true,
            }),
          );
        }

        // CONNECTED
        if (connection === "open") {
          console.log("=================================");
          console.log("✅ WhatsApp connected successfully");
          console.log("📱 WhatsApp is ready");
          console.log("=================================");

          resolve();
        }

        // DISCONNECTED
        if (connection === "close") {
          const statusCode = lastDisconnect?.error?.output?.statusCode;

          const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

          console.log("❌ WhatsApp connection closed");
          console.log("Reason:", statusCode);

          whatsappSocket = null;

          if (shouldReconnect) {
            console.log("🔄 Reconnecting WhatsApp...");
            startWhatsApp();
          } else {
            console.log("⚠️ WhatsApp logged out");
          }
        }
      },
    );
  });
};

const formatWhatsAppNumber = (phone) => {
  const cleanedPhone = String(phone).replace(/\D/g, "");

  // Indian 10-digit number
  if (cleanedPhone.length === 10) {
    return `91${cleanedPhone}`;
  }

  return cleanedPhone;
};

export const sendWhatsAppMessage = async (phone, message) => {
  if (!whatsappSocket?.user) {
    throw new Error("WhatsApp is not connected");
  }

  if (!phone) {
    throw new Error("Customer phone number is missing");
  }

  const formattedPhone = formatWhatsAppNumber(phone);

  const jid = `${formattedPhone}@s.whatsapp.net`;

  await whatsappSocket.sendMessage(jid, {
    text: message,
  });

  console.log(`✅ WhatsApp message sent to ${formattedPhone}`);
};
