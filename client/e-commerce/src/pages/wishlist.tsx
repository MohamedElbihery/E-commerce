import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { Product } from "@/services/types";
import { addToCart } from "@/services/cartService";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await getWishlist();
        setWishlist(data.wishList);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = async (productId: string, quantity = 1) => {
    try {
      await addToCart(productId, quantity);
      alert("Added to cart!");
    } catch (err) {
      console.error("Failed to add to cart", err);
      alert("Failed to add to cart");
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      alert("Item removed from wishlist.");
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
      alert("Failed to remove item.");
    }
  };

  return (
    <>
      <Head>
        <title>My Wishlist | Exclusive</title>
      </Head>

      <main className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          My Wishlist
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center"
              >
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={item.imageCover || "/placeholder.png"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-blue-600 font-bold text-xl mb-4">
                  ${item.price}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </>
  );
}
