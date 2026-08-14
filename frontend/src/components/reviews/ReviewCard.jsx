import React, { useState } from "react";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

/**
 * Displays a single review.
 * If it belongs to the current user, shows Edit and Delete controls.
 */
const ReviewCard = ({ review, currentUserId, onDelete, onUpdated, productId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOwner = currentUserId && review.user?._id === currentUserId;

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const avatarInitial = review.user?.fullName?.[0]?.toUpperCase() || "U";
  const avatarColor = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-purple-100 text-purple-700",
    "bg-rose-100 text-rose-700",
  ][avatarInitial.charCodeAt(0) % 5];

  if (isEditing) {
    return (
      <div className="border border-blue-200 rounded-xl p-4 bg-blue-50/30">
        <ReviewForm
          productId={productId}
          existingReview={review}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false);
            onUpdated?.();
          }}
        />
      </div>
    );
  }

  return (
    <div className="border border-slate-100 rounded-xl p-4 bg-white hover:border-slate-200 transition-colors">
      <div className="flex items-start justify-between gap-3">
        {/* Author info */}
        <div className="flex items-center gap-2.5">
          {review.user?.profile?.url ? (
            <img
              src={review.user.profile.url}
              alt={review.user.fullName}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
          ) : (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor}`}
            >
              {avatarInitial}
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-800">
              {review.user?.fullName || "Verified Buyer"}
            </p>
            <p className="text-[11px] text-slate-400">{formattedDate}</p>
          </div>
        </div>

        {/* Owner actions */}
        {isOwner && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-400 hover:text-[#006bc0] hover:bg-slate-100 rounded-md transition-colors"
              title="Edit review"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
              title="Delete review"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2.5">
        <StarRating rating={review.rating} size={13} />
        <span className="text-[11px] font-semibold text-slate-700">
          {review.rating}/5
        </span>
        {review.isEdited && (
          <span className="text-[10px] text-slate-400 italic">(edited)</span>
        )}
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-xs text-slate-600 leading-relaxed mt-2">
          {review.comment}
        </p>
      )}

      {/* Verified badge */}
      <div className="flex items-center gap-1 mt-2.5">
        <CheckCircle size={11} className="text-emerald-500" />
        <span className="text-[11px] text-emerald-600 font-medium">
          Verified Purchase
        </span>
      </div>

      {/* Delete confirmation inline */}
      {showDeleteConfirm && (
        <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
          <p className="text-xs font-semibold text-rose-700 mb-2">
            Are you sure you want to delete your review?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onDelete?.(review._id);
                setShowDeleteConfirm(false);
              }}
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-md transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
