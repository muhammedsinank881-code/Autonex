import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100, 
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    logo: {
      url: { type: String, default: null },
      publicId: { type: String, default: null }, // e.g. Cloudinary asset id
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/i, "Website must be a valid URL"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Case-insensitive uniqueness on name (avoids "Nike" vs "nike" duplicates)
brandSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

// Generate/refresh slug whenever the name changes
brandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// findByIdAndUpdate doesn't run document middleware by default,
// so keep the slug in sync there too.
brandSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update?.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Brand", brandSchema);