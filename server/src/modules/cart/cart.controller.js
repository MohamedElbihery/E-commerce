import { Cart } from "../../../database/models/cart.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import { Product } from "../../../database/models/product.model.js";
import { handleAsyncError } from "../../middlewares/errors/asyncError.js";
import { AppError } from "../../utilities/appError.js";

function calcTotalPrice(cart) {
  cart.totalPrice = cart.items.reduce(
    (prev, item) => (prev += item.quantity * item.price),
    0
  );
  if (cart.discount) {
    cart.totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
  }
}

const addToCart = handleAsyncError(async (req, res, next) => {

  const userCart = await Cart.findOne({ user: req.user._id });
  console.log(userCart);
  
  
  const product = await Product.findById(req.body.product);
  console.log(product);
  
  if (!product) return next(new AppError("product not found", 409));

  req.body.price = product.price;

  if (req.body.quantity > product.stock)
    return next(new AppError("sold out", 409));

  if (!userCart) {
    let newUserCart = new Cart({
      user: req.user._id,
      items: [req.body],
    });

    calcTotalPrice(newUserCart);

    await newUserCart.save();

    res.status(201).json({ message: `done`, newUserCart });
  } else {
    let item = userCart.items.find((item) => item.product == req.body.product);

    if (item) {
      item.quantity += req.body.quantity || 1;
      if (item.quantity > product.stock)
        return next(new AppError("sold out", 409));
    }

    if (!item) userCart.items.push(req.body);

    calcTotalPrice(userCart);

    await userCart.save();

    res.status(201).json({ message: `done`, userCart });
  }
});

const updateQuantity = handleAsyncError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });

  let item = cart.items.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError("product not found", 409));

  item.quantity = req.body.quantity;
  calcTotalPrice(cart);

  await cart.save();
  res.status(201).json({ message: `done`, cart });
});

const getUserCart = handleAsyncError(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("cart not found", 409));
  }
  res.status(201).json({ message: `done`, cart });
});

const clearUserCart = handleAsyncError(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });
  if (!cart) {
    return next(new AppError("cart not found", 409));
  }
  res.status(201).json({ message: `done`, cart });
});

const deleteItem = handleAsyncError(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: req.params.id } } },
    { new: true }
  );

  if (!cart) return next(new AppError("Cart not found", 409));

  calcTotalPrice(cart);
  await cart.save();
  console.log(cart);

  res.status(200).json({ message: "Item deleted successfully", cart });
});

const applyCoupon = handleAsyncError(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    code: req.body.code,
    expire: { $gte: Date.now() },
  });
  if (!coupon) {
    return next(new AppError("oops coupon invalid", 409));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("cart not found", 409));
  }

  cart.discount = coupon.discount;

  calcTotalPrice(cart);

  await cart.save();

  res.status(201).json({ message: `done`, cart });
});

export {
  deleteItem,
  updateQuantity,
  getUserCart,
  addToCart,
  clearUserCart,
  applyCoupon,
};
