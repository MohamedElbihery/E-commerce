import { apiClient } from "./apiClient";

const api = apiClient();

const getAllProducts = async () => {
  const response = await api.get("products").json();
  const products = response.documents;
  return products;
};

const getSingleProduct = async (id) => {
  const response = await api.get(`products/${id}`).json();
  const product = response.document;
  return product;
};

export { getAllProducts, getSingleProduct };
