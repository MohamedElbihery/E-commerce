import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    comment: {
      type: String,
      max: 2000,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);
schema.pre(/^find/, function () {
  this.populate("user");
});

export const Review = model("Review", schema);
