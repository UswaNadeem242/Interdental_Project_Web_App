import React, { memo } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { calculateRating } from "../services/utils/calculateRating";

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCard = memo(
  ({ product, wishlistSet, onProductClick, onAddToCart, onToggleWishlist }) => {
    const isInWishlist = wishlistSet.has(product?.productId);

    return (
      <div
        key={product.productId}
        className="flex flex-col justify-between items-center bg-white rounded-lg shadow-sm p-3 sm:p-4 cursor-pointer h-[430px] hover:shadow-md transition-shadow"
      >
        {/* Upper Section */}
        <div
          onClick={() => onProductClick(product)}
          className="flex flex-col items-center flex-grow"
        >
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-[263px] h-[260px] object-cover"
            loading="lazy"
            decoding="async"
          />

          <div className="text-center mt-3 flex flex-col flex-grow justify-between">
            <h1 className="font-poppins font-semibold text-base text-black leading-snug line-clamp-2">
              {product.name}
            </h1>

            <div className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD] flex gap-2 justify-center items-center">
              ${product.price}
              <span className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-poppins font-normal text-[#585858]">
                  {calculateRating(product)}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="flex items-center gap-2 sm:gap-3 mt-2 w-full">
          <div
            onClick={() => onAddToCart(product?.productId)}
            className="flex justify-center items-center cursor-pointer flex-1 h-[44px] sm:h-[48px] text-secondaryBrand hover:text-white bg-background hover:bg-secondaryBrand py-2 sm:py-[17px] px-3 sm:px-[24px] rounded-[28px] transition-colors"
          >
            <h1 className="font-poppins font-normal text-xs leading-[21px]">
              Add to Cart
            </h1>
          </div>

          {/* ❤️ Wishlist Button */}
          <div
            onClick={(e) => onToggleWishlist(product?.productId, e)}
            className={`flex justify-center items-center cursor-pointer w-[44px] h-[44px] sm:w-[51.28px] sm:h-[51.28px] p-2 sm:p-[12.82px] rounded-[55.1px] transition-all duration-300 hover:scale-110 ${isInWishlist
                ? "bg-red-50 shadow-md"
                : "bg-[#F8F8F8] hover:bg-red-50"
              }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer transition-all duration-300 sm:w-[27px] sm:h-[27px]"
            >
              <path
                d="M13.5738 23.2431C-7.78248 11.4391 7.16722 -1.37494 13.5738 6.72787C19.9813 -1.37494 34.931 11.4391 13.5738 23.2431Z"
                stroke={isInWishlist ? "#FF0000" : "#001D58"}
                strokeWidth="1.92211"
                fill={isInWishlist ? "#FF0000" : "none"}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
