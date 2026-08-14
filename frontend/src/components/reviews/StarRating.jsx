import React from "react";
import { Star } from "lucide-react";

/**
 * Reusable star rating display component.
 * @param {number} rating - Current rating value (0-5)
 * @param {number} size - Star size in pixels (default 14)
 * @param {boolean} interactive - If true, renders as clickable stars
 * @param {function} onChange - Called with new rating when interactive
 */
const StarRating = ({
  rating = 0,
  size = 14,
  interactive = false,
  onChange,
}) => {
  const [hovered, setHovered] = React.useState(0);

  const displayRating = interactive ? (hovered || rating) : rating;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(displayRating);
        const halfFilled =
          !filled && star === Math.ceil(displayRating) && displayRating % 1 >= 0.5;

        return (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={interactive ? () => onChange?.(star) : undefined}
            onMouseEnter={interactive ? () => setHovered(star) : undefined}
            onMouseLeave={interactive ? () => setHovered(0) : undefined}
            className={`focus:outline-none ${interactive ? "cursor-pointer" : "cursor-default"}`}
          >
            <Star
              size={size}
              className={`transition-colors ${
                filled || (interactive && hovered >= star)
                  ? "text-[#f5b300] fill-[#f5b300]"
                  : halfFilled
                  ? "text-[#f5b300] fill-[#f5b300]/50"
                  : "text-slate-200 fill-slate-200"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
