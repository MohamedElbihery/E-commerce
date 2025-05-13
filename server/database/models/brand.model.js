import { model, Schema, Types } from "mongoose";

const schema = Schema(
  {
    name: {
      type: String,
      unique: [true, "invalid name"],
      trim: true,
      required: true,
      min: [2, "invalid name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: String,
    subCategory: {
      type: Types.ObjectId,
      ref: "SubCategory"
    },
    category: {
      type: Types.ObjectId,
      ref: "Category"
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.post("init",function(doc) {
  if(doc.image) doc.image = "http://localhost:5000/uploads/brands/" + doc.image
})

export const Brand = model("Brand", schema);
