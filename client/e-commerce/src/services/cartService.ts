import { apiClient } from "./apiClient";
import { CartResponse } from "./types";

const api = apiClient();

export const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .post("carts", {
      json: { product: productId, quantity },
      headers: { Authorization: `Bearer ${token}` },
    })
    .json<CartResponse>(); // Fetch the response and type it explicitly
  return response; // Return the response
};

export const getUserCart = async (): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .get("carts", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .json<CartResponse>(); // Fetch and type the response explicitly

  console.log("Cart Response:", response); // Log the response to inspect its structure

  return response; // Return the response
};

export const updateCartQuantity = async (
  productId: string,
  quantity: number
): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .put(`carts/${productId}`, {
      json: { quantity },
      headers: { Authorization: `Bearer ${token}` },
    })
    .json<CartResponse>(); // Fetch and type the response explicitly
  return response; // Return the response
};

export const deleteCartItem = async (itemId: string): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .delete(`carts/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .json<CartResponse>();

  console.log("API Response:", response); // Log the response for debugging
  return response;
};

export const clearCart = async (): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .delete("carts", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .json<CartResponse>(); // Fetch and type the response explicitly
  return response; // Return the response
};

export const applyCouponCode = async (code: string): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .patch("carts/apply-coupon", {
      json: { code },
      headers: { Authorization: `Bearer ${token}` },
    })
    .json<CartResponse>(); // Fetch and type the response explicitly
  return response; // Return the response
};
