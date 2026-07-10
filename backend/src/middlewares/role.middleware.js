import User from "../models/User.js";

export const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  next();
};
