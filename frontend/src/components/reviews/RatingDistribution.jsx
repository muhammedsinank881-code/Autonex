import React from "react";
import StarRating from "./StarRating";

/**
 * Rating distribution bar chart.
 * Shows the breakdown of 5★ → 1★ reviews with filled progress bars.
 */
const RatingDistribution = ({ ratingBreakdown = {}, totalReviews = 0, averageRating = 0 }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
      {/* Overall average */}
      <div className="flex flex-col items-center shrink-0 min-w-[80px]">
        <span className="text-4xl font-bold text-slate-900 leading-none">
          {averageRating > 0 ? averageRating.toFixed(1) : "—"}
        </span>
        <StarRating rating={averageRating} size={14} />
        <span className="text-xs text-slate-400 mt-1">
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-16 bg-slate-200 shrink-0" />

      {/* Star bars */}
      <div className="flex flex-col gap-1.5 flex-1 w-full">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingBreakdown[star] || 0;
          const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="text-slate-600 font-semibold w-4 shrink-0 text-right">
                {star}
              </span>
              <span className="text-[#f5b300] text-sm">★</span>
              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#f5b300] h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-slate-400 w-6 shrink-0 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingDistribution;
