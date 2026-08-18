import React from "react";
import { Link } from "react-router-dom";
import Price from "../../../components/common/Price";

const DealCard = ({ item }) => {
  const available = item.available || 0;
  const sold = item.sold || 0;

  const total = available + sold;

  const progressPercentage = total > 0 ? (sold / total) * 100 : 0;

  const discountPercentage = item.discountPrice
    ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
    : 0;

  const hasDiscount =
    item.discountPrice != null &&
    item.discountPrice > 0 &&
    item.discountPrice < item.price;
  return (
    <Link
      to={`/product/${item.id}`}
    >
      <div
        key={item.id}
        className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow relative"
      >
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
            -{discountPercentage}%
          </span>
        )}

        {/* Product Image */}
        <div className="w-24 h-24 shrink-0 bg-gray-50 rounded flex items-center justify-center p-1">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <h3
            className="text-xs font-semibold text-gray-800 truncate"
            title={item.title}
          >
            {item.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <Price
              amount={hasDiscount ? item.discountPrice : item.price}
              className="text-sm font-bold text-[#00A651]"
            />

            {hasDiscount && (
              <Price
                amount={item.price}
                currency={item.currency || "INR"}
                className="text-[10px] sm:text-xs text-gray-400 line-through"
              />
            )}
          </div>

          {/* Progress Bar & Availability */}
          <div className="pt-2">
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-1">
              <div
                className="bg-red-500 h-full rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-medium">
              <span>
                Available:{" "}
                <strong className="text-gray-700">{item.available}</strong>
              </span>
              <span>
                Sold: <strong className="text-gray-700">{item.sold}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;

