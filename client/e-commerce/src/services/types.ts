export interface Category {
  _id: string;
  name: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  rateAvg: number;
  rateCount: number;
  imageCover: string;
}

export type WishlistResponse = {
  message: string;
  wishList: Product[];
};

export interface CartItem {
  product: string
  price: number;
  quantity: number;
}


export interface CartDocument {
  _id: string;
  user: string;         // user ID
  items: CartItem[];
  totalPrice: number;
  totalPriceAfterDiscount?: number;
  discount?: number;
}

export interface CartResponse {
  message: string;
  cart: {
    _id: string;
    createdAt: string;
    user: string;
    items: CartItem[];
    totalPrice: number;
    totalPriceAfterDiscount?: number;
    discount:number;
  };
}
