import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  getUserCart,
  updateCartQuantity,
  applyCouponCode,
  deleteCartItem,
  clearCart,
} from "../services/cartService";
import { CartResponse, CartItem } from "../services/types"; // Ensure proper types are imported

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Ensure cartItems is an empty array initially
  const [couponCode, setCouponCode] = useState<string>("");
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false); // Track if we're in editing mode

  useEffect(() => {
    // Fetch user's cart data on component mount
    const fetchCart = async () => {
      try {
        const cartResponse: CartResponse = await getUserCart(); // Ensure CartResponse is used
        const cart = cartResponse.cart; // Accessing the cart object from the response
        setCartItems(cart.items || []); // Ensure items are set to an empty array if undefined

        // Calculate subtotal
        const subTotal =
          cart.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) || 0; // Handle undefined values safely
        setSubtotal(subTotal);
        setTotal(subTotal); // Calculate total
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId: string, quantity: number) => {
    try {
      const updatedCart: CartResponse = await updateCartQuantity(
        productId,
        quantity
      );
      setCartItems(updatedCart.cart.items || []);

      const subTotal =
        updatedCart.cart.items?.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ) || 0;
      setSubtotal(subTotal);
      setTotal(subTotal); // Recalculate total
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleCouponApply = async (code: string) => {
    try {
      const updatedCart = await applyCouponCode(code);

      const newItems = updatedCart.cart.items || [];

      setCartItems(newItems);

      const subTotal =
        newItems.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
        0;

      setSubtotal(subTotal);

      if (updatedCart.cart.totalPriceAfterDiscount) {
        setTotal(updatedCart.cart.totalPriceAfterDiscount);
      } else {
        setTotal(subTotal);
      }

      alert("Coupon applied!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply coupon");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const updatedCart: CartResponse = await deleteCartItem(itemId);

      if (updatedCart?.cart) {
        setCartItems(updatedCart.cart.items || []);

        const subTotal =
          updatedCart.cart.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) || 0;
        setSubtotal(subTotal);
        setTotal(subTotal); // Recalculate total
      } else {
        console.error("No cart data returned");
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);

      const subTotal = 0;
      setSubtotal(subTotal);
      setTotal(subTotal);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Shopping Cart | Exclusive</title>
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Shopping Cart</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Shopping Cart
          </h1>

          <div className="overflow-x-auto bg-white rounded-xl shadow p-6 mb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-4 text-gray-700 text-lg font-semibold">
                    Product
                  </th>
                  <th className="py-4 text-gray-700 text-lg font-semibold">
                    Price
                  </th>
                  <th className="py-4 text-gray-700 text-lg font-semibold">
                    Quantity
                  </th>
                  <th className="py-4 text-gray-700 text-lg font-semibold">
                    Subtotal
                  </th>
                  {isEditing && (
                    <th className="py-4 text-gray-700 text-lg font-semibold">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr key={item.product} className="border-t">
                    <td className="py-6">
                      <div className="flex items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mr-4">
                          <Image
                            src={item.product.imageUrl || "/default-image.jpg"}
                            alt={item.product.name || "Product image"}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-gray-800 text-base">
                          {item.product.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-gray-700 text-base">
                      ${item.price.toFixed(2)}
                    </td>
                    <td>
                      {isEditing ? (
                        <div className="flex items-center border rounded-lg w-28 h-11">
                          <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-xl h-full"
                            onClick={() => {
                              handleQuantityChange(
                                item.product,
                                item.quantity - 1
                              );
                            }}
                          >
                            -
                          </button>
                          <span className="flex-1 text-center text-base">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-xl h-full"
                            onClick={() =>
                              handleQuantityChange(
                                item.product,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-800 text-base">
                          {item.quantity}
                        </span>
                      )}
                    </td>
                    <td className="font-semibold text-blue-600 text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    {isEditing && (
                      <td className="py-6">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteItem(item.product)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mb-12 gap-6">
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 text-base font-medium text-center"
            >
              Return To Shop
            </Link>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Save Changes" : "Update Cart"}
            </button>
          </div>

          {/* Coupon */}
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Coupon Code
              </h3>
              <div className="flex h-12">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:outline-none"
                />
                <button
                  className="px-6 bg-gray-800 text-white rounded-r-lg hover:bg-gray-700 font-medium"
                  onClick={() => handleCouponApply(couponCode)} // pass the value
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Cart Total */}
            <div className="lg:w-1/2 bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Total
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-base text-gray-700">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base text-gray-700">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-4 text-gray-900">
                  <span>Total:</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

          {/* Clear Cart Button */}
          <div className="text-center mt-6">
            <button
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-base font-medium"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
