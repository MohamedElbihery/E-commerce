import 'dotenv/config';
import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { handleAsyncError } from "../../middlewares/errors/asyncError.js";
import { AppError } from "../../utilities/appError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCashOrder = handleAsyncError(async (req, res, next) => {
  // get user cart by cartid
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new AppError("cart not found", 409));
  }

  // get total order price
  const totalPrice = cart.totalPriceAfterDiscount || cart.totalPrice;

  // create Order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.items,
    address: req.body.address,
    totalPrice: totalPrice,
  });
  await order.save();

  // increment sold & decrement stock
  let products = cart.items.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: item.quantity, stock: -item.quantity } },
      },
    };
  });

  await Product.bulkWrite(products);

  // clear user cart
  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json({ message: `done`, order });
});

const getUserOrders = handleAsyncError(async (req, res, next) => {
  const userId = req.params.id || req.user._id; // Use `req.params.id` when nested
  const orders = await Order.find({ user: userId });
  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found for this user", 404));
  }

  res
    .status(200)
    .json({ message: "User orders retrieved successfully", orders });
});

const getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found", 404));
  }
  res
    .status(200)
    .json({ message: "All orders retrieved successfully", orders });
});

const createPaymentSession = handleAsyncError(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new AppError("cart not found", 409));
  }

  // get total order price
  const totalPrice = cart.totalPriceAfterDiscount || cart.totalPrice;
  let session = await stripe.checkout.sessions.create({
    line_items:[
      {
        price_data:{
          currency:'egp', 
          unit_amount:totalPrice*100,
          product_data:{
            name:req.user.name
          }
        },
        quantity:1
      }
    ],
    mode:'payment',
    success_url:"https://www.youtube.com/watch?v=exovo7EHx2c",
    cancel_url:"https://www.youtube.com/watch?v=4fI-C0x5Vhg",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
  })
  res
  .status(200)
  .json({ message: "done", session });
});

export { createCashOrder, getUserOrders, getAllOrders ,createPaymentSession};
