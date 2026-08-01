import Wishlist from "../models/Wishlist.js";

// Find wishlist by user ID
export const findWishlistByUserId = (userId) => {
  return Wishlist.findOne({ userId }).populate({
    path: "products",
    match: {
      isActive: true,
    },
    select: "name price discountPrice stock images brand category variants",
    populate: [
      {
        path: "brand",
        select: "name",
      },
      {
        path: "category",
        select: "name",
      },
    ],
  });
};

// Create wishlist
export const createWishlist = (data) => {
  return Wishlist.create(data);
};

// Save wishlist
export const saveWishlist = (wishlist) => {
  return wishlist.save();
};

// Delete wishlist
export const deleteWishlist = (userId) => {
  return Wishlist.findOneAndDelete({ userId });
};
