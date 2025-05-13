import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getSingleProduct } from "@/services/productService";
import { Product } from "@/services/types";
import { addToWishlist } from "@/services/wishlistService";
import { addToCart } from "@/services/cartService";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // ✅ counter state

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id as string);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      if (!product) return;
      await addToWishlist(product._id);
      alert("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!product) return;
      await addToCart(product._id, quantity); // ✅ send product ID and quantity
      alert("Added to cart!");
    } catch (err) {
      console.error("Failed to add to cart", err);
      alert("Failed to add to cart");
    }
  };

  return (
    <>
      <Head>
        <title>Exclusive | Product Details</title>
        <meta name="description" content="View product details" />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="mb-6 text-blue-600 hover:underline"
          >
            &larr; Back to products
          </button>

          {loading ? (
            <p className="text-center text-gray-500">Loading product...</p>
          ) : error || !product ? (
            <p className="text-center text-red-500">
              {error || "Product not found."}
            </p>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Product Image */}
                <div className="md:w-1/2">
                  <div className="bg-gray-100 h-96 rounded-lg relative overflow-hidden">
                    {product.imageCover ? (
                      <Image
                        src={product.imageCover}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image Available
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:w-1/2">
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <div className="text-2xl font-semibold text-gray-800 mb-4">
                    ${product.price?.toFixed(2)}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-700">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Counter */}
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 text-xl"
                      >
                        -
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1 text-xl"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={handleAddToWishlist}
                      className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductPage;
