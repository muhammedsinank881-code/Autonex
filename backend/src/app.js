import express from "express";

const app = express();

app.use(express.json());
app.set("trust proxy", 1);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running")
});

export default app;