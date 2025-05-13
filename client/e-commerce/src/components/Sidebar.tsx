import React, { useEffect, useState } from "react";
import {
  getCategories,
  getSubcategories,
  getBrands,
} from "../services/sidebarService";
import { Category, Subcategory, Brand } from "@/services/types";

interface SidebarProps {
  showMobileSidebar: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  showMobileSidebar,
  closeSidebar,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [expandedSection, setExpandedSection] = useState<
    "categories" | "brands" | null
  >("categories");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setSubcategories([]);
      setSelectedSubcategory(null);
      setBrands([]);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubcategory(null);
      setBrands([]);

      try {
        const fetchedSubcategories = await getSubcategories(categoryId);
        const filteredSubcategories = fetchedSubcategories.filter(
          (sub) => sub.category === categoryId
        );
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  const handleSubcategoryClick = async (subcategoryId: string) => {
    if (selectedSubcategory === subcategoryId) {
      setSelectedSubcategory(null);
      setBrands([]);
    } else {
      setSelectedSubcategory(subcategoryId);
      try {
        const fetchedBrands = await getBrands(subcategoryId);
        const filteredBrands = fetchedBrands.filter(
          (brand) => brand.subCategory === subcategoryId
        );
        setBrands(filteredBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }
  };

  return (
    <div
      className={`${
        showMobileSidebar
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      } fixed md:static inset-y-0 left-0 z-30 w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Shop Categories</h2>
        <button
          onClick={closeSidebar}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories */}
        <div className="border-b border-gray-100 pb-4">
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "categories" ? null : "categories"
              )
            }
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-gray-500 transform transition-transform ${
                expandedSection === "categories" ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {expandedSection === "categories" && (
            <ul className="mt-2 space-y-1">
              {categories.map((category) => (
                <li key={category._id} className="group">
                  <button
                    onClick={() => handleCategoryClick(category._id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left ${
                      selectedCategory === category._id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transform transition-transform ${
                        selectedCategory === category._id ? "rotate-90" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {selectedCategory === category._id && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {subcategories.length > 0 ? (
                        subcategories.map((subcategory) => (
                          <li key={subcategory._id}>
                            <button
                              onClick={() =>
                                handleSubcategoryClick(subcategory._id)
                              }
                              className={`w-full px-3 py-2 rounded-md text-left ${
                                selectedSubcategory === subcategory._id
                                  ? "bg-blue-100 text-blue-800"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              {subcategory.name}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-gray-500">
                          No subcategories available
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Brands */}
        {selectedSubcategory && (
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800">Brands</h3>
            <ul className="mt-2 space-y-1">
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <li key={brand._id}>
                    <button className="w-full px-3 py-2 rounded-md text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      {brand.name}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No brands available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
