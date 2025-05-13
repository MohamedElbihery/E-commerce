import { apiClient } from "./apiClient";
import { Category, Subcategory, Brand } from "./types";

const api = apiClient();

// Fetch categories for the sidebar
const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("categories").json();
    return (response as { documents: Category[] }).documents;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch subcategories for a given category
const getSubcategories = async (categoryId: string): Promise<Subcategory[]> => {
  try {
    const response = await api
      .get(`categories/${categoryId}/subcategories`)
      .json();
      
    return (response as { documents: Subcategory[] }).documents;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

// Fetch brands for a given subcategory
const getBrands = async (subcategoryId: string): Promise<Brand[]> => {
  try {
    const response = await api.get(`subcategories/${subcategoryId}/brands`).json();
    return (response as { documents: Brand[] }).documents;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}

export { getCategories, getSubcategories, getBrands };
