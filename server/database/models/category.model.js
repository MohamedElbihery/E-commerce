import { model, Schema } from "mongoose";

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
      required: false,
    },
    image: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.post("init", function (doc) {
  if (doc.image)
    doc.image = "http://localhost:5000/uploads/categories/" + doc.image;
});

export const Category = model("Category", schema);
