import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import useCreateReview from "../../hooks/reviews/useCreateReview";
import useUpdateReview from "../../hooks/reviews/useUpdateReview";

/**
 * Reusable review form for Create and Edit modes.
 * - Create mode: requires orderId
 * - Edit mode: accepts existingReview with pre-filled data
 */
const ReviewForm = ({
  productId,
  eligibleOrderId,      // Required in create mode
  existingReview,       // Provided in edit mode
  onCancel,
  onSuccess,
}) => {
  const isEditMode = !!existingReview;

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [ratingError, setRatingError] = useState("");

  const { mutate: createReview, isPending: isCreating } = useCreateReview(productId);
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview(productId);

  const isPending = isCreating || isUpdating;
  const MAX_CHARS = 1000;
  const charsLeft = MAX_CHARS - comment.length;

  // Sync edit mode pre-fill if existingReview changes
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment || "");
    }
  }, [existingReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRatingError("");

    if (rating < 1 || rating > 5) {
      setRatingError("Please select a rating");
      return;
    }

    if (comment.length > 0 && comment.trim().length < 10) {
      return; // HTML minlength handles this via backend; show inline error
    }

    if (isEditMode) {
      updateReview(
        { reviewId: existingReview._id, rating, comment: comment.trim() || undefined },
        { onSuccess }
      );
    } else {
      createReview(
        {
          productId,
          orderId: eligibleOrderId,
          rating,
          comment: comment.trim() || undefined,
        },
        { onSuccess }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-1.5">
          Your Rating <span className="text-rose-500">*</span>
        </p>
        <StarRating
          rating={rating}
          size={22}
          interactive
          onChange={(val) => {
            setRating(val);
            setRatingError("");
          }}
        />
        {ratingError && (
          <p className="text-xs text-rose-500 mt-1">{ratingError}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
          Your Review{" "}
          <span className="text-slate-400 font-normal">(optional, min 10 chars)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          maxLength={MAX_CHARS}
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-700 placeholder-slate-300 resize-none focus:outline-none focus:border-[#006bc0] transition-colors"
        />
        <div className="flex justify-between items-center mt-1">
          {comment.length > 0 && comment.trim().length < 10 && (
            <p className="text-xs text-rose-500">Comment must be at least 10 characters</p>
          )}
          <p className={`text-[11px] ml-auto ${charsLeft < 100 ? "text-amber-500" : "text-slate-400"}`}>
            {charsLeft} characters left
          </p>
        </div>
      </div>

      <div className="flex gap-2.5">
        <button
          type="submit"
          disabled={isPending || rating < 1}
          className="px-5 py-2 bg-[#006bc0] hover:bg-[#005aa3] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
        >
          {isPending
            ? isEditMode ? "Saving..." : "Submitting..."
            : isEditMode ? "Save Changes" : "Submit Review"
          }
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="px-5 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
