import mongoose from "mongoose";

export const DBconnect = mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(() => {
    console.log("DB connected successefully");
  })
  .catch((err) => {
    console.log("DB error", err);
  });
