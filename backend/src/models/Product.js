import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      trim: true,
    },
  },
  {
    _id: true,
  },
);

const compatibleVehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
    },
  },
  {
    _id: false,
  },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    totalSold: {
      type: Number,
      default: 0,
    },

    displayPriority: {
      type: Number,
      default: 0,
    },

    // ─── Denormalized rating fields ─────────────────────────────────────────
    // Pre-computed from the Review collection every time a review is
    // created, updated, or deleted. Avoids expensive per-request aggregation
    // when listing/filtering products by rating.
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    images: [
      {
        url: String,
        publicId: String,
        alt: String,
      },
    ],

    variants: [variantSchema],

    compatibleVehicles: [compatibleVehicleSchema],

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Useful indexes
productSchema.index({ name: "text" });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ basePrice: 1 });
productSchema.index({ createdAt: -1 });
// For rating-based filtering and sorting on the product listing page
productSchema.index({ averageRating: -1 });

export default mongoose.model("Product", productSchema);
