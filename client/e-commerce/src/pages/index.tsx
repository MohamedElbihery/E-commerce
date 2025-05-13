import { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService"; // Adjust the path based on your file structure
import { Product } from "@/services/types";

export default function Home() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Type the products state with the Product type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Type the error state as a string or null

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts); // Set the fetched products into state
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to close the sidebar
  const closeSidebar = () => {
    setShowMobileSidebar(false);
  };

  return (
    <>
      <Head>
        <title>Exclusive - Premium Products</title>
        <meta
          name="description"
          content="Discover our exclusive collection of premium products"
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="md:hidden mb-6 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
          >
            <span className="mr-2">☰</span> Browse Categories
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Column */}
            <aside
              className={`${
                showMobileSidebar ? "block" : "hidden"
              } md:block w-full md:w-64 flex-shrink-0`}
            >
              <Sidebar
                showMobileSidebar={showMobileSidebar}
                closeSidebar={closeSidebar}
              />
            </aside>

            {/* Main Content Column */}
            <main className="flex-1">
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Products
                </h2>

                {/* Display loading or error message */}
                {loading && <p className="text-center text-gray-500">Loading products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Display products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No products available.</p>
                  )}
                </div>

                {/* View More Button */}
                <div className="mt-10 text-center">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors">
                    View All Products
                  </button>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
