import { apiClient } from "./apiClient";
import { WishlistResponse, Product } from "./types";

const api = apiClient();

export const getWishlist = async (): Promise<{ wishList: Product[] }> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    const response = await api
      .get("wishLists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<{ wishList: Product[] }>();

    return response;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

export const addToWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .patch("wishLists", {
      json: { product: productId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<WishlistResponse>();
  return response;
};

export const removeFromWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await api
    .delete(`wishLists/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<WishlistResponse>();

  return response;
};
