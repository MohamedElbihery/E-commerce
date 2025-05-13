import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    rateAvg: number;
    rateCount: number;
    imageCover: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderStars = (rateAvg: number) => {
    const stars = [];
    const fullStars = Math.floor(rateAvg);
    const hasHalfStar = rateAvg % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars || (i === fullStars + 1 && hasHalfStar)) {
        stars.push(<FaStar key={i} className="text-amber-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.imageCover ? (
          <Image
            src={product.imageCover}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.description}</p>

        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-2xl font-bold text-emerald-600">
            ${product.price ? product.price.toFixed(2) : "N/A"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">{renderStars(product.rateAvg || 0)}</div>
          <span className="text-sm text-gray-500">
            ({product.rateCount || 0})
          </span>
        </div>

        {/* View Product Button */}
        <Link href={`/product?id=${product._id}`} passHref>
          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow hover:shadow-md">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
