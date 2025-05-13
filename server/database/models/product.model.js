import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "invalid name"],
      trim: true,
      required: true,
      minlength: [2, "invalid name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      minlength: 50,
      maxlength: 10000,
    },
    imageCover: String,
    images: [String],
    subCategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    sold: {
      type: Number,
      min: [0, "Sold count cannot be negative"],
      default: 0,
    },
    stock: {
      type: Number,
      min: [0, "Stock count cannot be negative"],
      default: 0,
    },
    rateAvg: {
      type: Number,
      min: [0, "Rating average cannot be negative"],
      max: [5, "Rating average cannot exceed 5"],
    },
    rateCount: {
      type: Number,
      min: [0, "Rating count cannot be negative"],
      default: 0,
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "Discounted price cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discounted price should be less than or equal to the price",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

schema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

schema.pre(/^find/, function () {
  this.populate("reviews");
});

schema.post("init", function (doc) {
  if (doc.imageCover)
    doc.imageCover = "http://localhost:5000/uploads/products/" + doc.imageCover;

  if (doc.images)
    doc.images = doc.images.map((img) => {
      return "http://localhost:5000/uploads/products/" + img;
    });
});

export const Product = model("Product", schema);
