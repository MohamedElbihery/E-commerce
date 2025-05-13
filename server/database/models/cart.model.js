import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
    totalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);

export const Cart = model("Cart", schema);
