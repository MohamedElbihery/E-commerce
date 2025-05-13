import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    expire: Date,
    discount: Number,
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);

export const Coupon = model("Coupon", schema);
