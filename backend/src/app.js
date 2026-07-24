import dns from "node:dns";
import express from "express";

dns.setDefaultResultOrder("ipv4first");

const app = express();

app.use(express.json());
app.set("trust proxy", 1);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;
