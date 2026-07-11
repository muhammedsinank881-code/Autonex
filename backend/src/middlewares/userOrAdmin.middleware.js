import User from "../models/User.js";

export const ownerOrAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role === "admin" || req.user.id === req.params.id) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access Denied",
  });
};
