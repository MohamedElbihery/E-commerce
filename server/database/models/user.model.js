import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    OTP: String,
    OTPExpire: Date,
    confirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    wishList: [{ type: Types.ObjectId, ref: "Product" }],
    addresses: [{ city: String, street: String, phone: String }],
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});
schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const User = model("User", schema);
