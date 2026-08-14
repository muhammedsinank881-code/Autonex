import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import useProductReviews from "../../hooks/reviews/useProductReviews";
import useMyReview from "../../hooks/reviews/useMyReview";
import useDeleteReview from "../../hooks/reviews/useDeleteReview";
import useMyOrders from "../../hooks/orders/useMyOrders";
import RatingDistribution from "./RatingDistribution";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";

/**
 * Main ProductReviews section.
 * Handles:
 * - Fetching and displaying all reviews with pagination
 * - Rating distribution chart
 * - Eligibility check (purchased & delivered)
 * - Create / Edit / Delete flow
 */
const ProductReviews = ({ productId, averageRating = 0, reviewCount = 0 }) => {
  const [page, setPage] = useState(1);
  const [showWriteForm, setShowWriteForm] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Fetch reviews
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useProductReviews(productId, page);

  // Fetch current user's review
  const { data: myReviewData, isLoading: myReviewLoading } = useMyReview(productId);

  // Fetch user's orders (to check eligibility)
  // We use page=1, limit=10 — enough to find a DELIVERED order for this product
  const { data: ordersData } = useMyOrders("", "", 1);

  const { mutate: deleteReview } = useDeleteReview(productId);

  const reviews = reviewsData?.data || [];
  const ratingBreakdown = reviewsData?.ratingBreakdown || {};
  const pagination = reviewsData?.pagination || {};
  const myReview = myReviewData?.data || null;

  // ─── Eligibility Logic ────────────────────────────────────────────────────────
  // Find if the user has a DELIVERED order containing this product
  const deliveredOrderWithProduct = (() => {
    if (!isAuthenticated || !ordersData?.data) return null;
    return ordersData.data.find(
      (order) =>
        order.orderStatus === "DELIVERED" &&
        order.items?.some(
          (item) => item.productId?.toString() === productId?.toString()
        )
    );
  })();

  // An order exists with this product but isn't DELIVERED yet
  const pendingOrderWithProduct = (() => {
    if (!isAuthenticated || !ordersData?.data) return null;
    return ordersData.data.find(
      (order) =>
        order.orderStatus !== "DELIVERED" &&
        order.orderStatus !== "CANCELLED" &&
        order.items?.some(
          (item) => item.productId?.toString() === productId?.toString()
        )
    );
  })();

  const canReview =
    isAuthenticated && !!deliveredOrderWithProduct && !myReview;

  // ─── Render eligibility block ─────────────────────────────────────────────────
  const renderEligibilityBlock = () => {
    if (!isAuthenticated) {
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-600">
            <Link to="/account" className="text-[#006bc0] font-semibold hover:underline">
              Login
            </Link>{" "}
            to write a review.
          </p>
        </div>
      );
    }

    if (myReview) {
      return (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-emerald-700 mb-3">Your Review</p>
          <ReviewCard
            review={myReview}
            currentUserId={user?._id || user?.id}
            onDelete={(reviewId) => deleteReview(reviewId)}
            productId={productId}
          />
        </div>
      );
    }

    if (deliveredOrderWithProduct) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          {showWriteForm ? (
            <>
              <p className="text-xs font-semibold text-slate-700 mb-3">Write a Review</p>
              <ReviewForm
                productId={productId}
                eligibleOrderId={deliveredOrderWithProduct._id}
                onCancel={() => setShowWriteForm(false)}
                onSuccess={() => setShowWriteForm(false)}
              />
            </>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Purchased & Delivered</p>
                <p className="text-xs text-slate-500 mt-0.5">Share your experience with others</p>
              </div>
              <button
                onClick={() => setShowWriteForm(true)}
                className="px-4 py-2 bg-[#006bc0] hover:bg-[#005aa3] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>
      );
    }

    if (pendingOrderWithProduct) {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
          <span className="font-semibold">Order in progress.</span> You can review this product
          after it is delivered.
        </div>
      );
    }

    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 text-center">
        Purchase this product to leave a review.
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-1">
        <MessageSquare size={16} className="text-[#006bc0]" />
        <h3 className="text-sm font-bold text-slate-800">
          Customer Reviews
          {reviewCount > 0 && (
            <span className="ml-2 text-slate-400 font-normal">({reviewCount})</span>
          )}
        </h3>
      </div>

      {/* Rating summary & distribution */}
      {(reviewCount > 0 || reviews.length > 0) && (
        <RatingDistribution
          ratingBreakdown={ratingBreakdown}
          totalReviews={pagination.totalReviews || reviewCount}
          averageRating={averageRating}
        />
      )}

      {/* User eligibility block */}
      {(isAuthenticated || !reviewsLoading) && (
        <div>{renderEligibilityBlock()}</div>
      )}

      {/* Reviews list */}
      {reviewsLoading ? (
        <div className="flex items-center justify-center py-8 text-slate-400">
          <Loader2 size={20} className="animate-spin mr-2" />
          <span className="text-xs">Loading reviews...</span>
        </div>
      ) : reviewsError ? (
        <div className="text-center py-8 text-xs text-rose-500">
          Failed to load reviews. Please try again.
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare size={32} className="text-slate-200 mx-auto mb-2" />
          <p className="text-xs text-slate-400">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUserId={user?._id || user?.id}
              onDelete={(reviewId) => deleteReview(reviewId)}
              productId={productId}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!reviewsLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={!pagination.hasPreviousPage}
            className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="text-xs text-slate-500">
            Page <strong className="text-slate-700">{pagination.currentPage}</strong> of{" "}
            <strong className="text-slate-700">{pagination.totalPages}</strong>
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
            disabled={!pagination.hasNextPage}
            className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
