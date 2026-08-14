import React from "react";
import { Star, Pencil } from "lucide-react";
import useMyReview from "../../../hooks/reviews/useMyReview";

const OrderProductReviewAction = ({ item, orderId, reviewingProductId, setReviewingProductId }) => {
    // Only fetch if we have a productId
    const { data: myReviewData, isLoading } = useMyReview(item.productId);
    const myReview = myReviewData?.data;

    if (isLoading) {
        return <div className="text-[10px] text-slate-400 mt-2">Checking review status...</div>;
    }

    const isCurrentlyReviewing = reviewingProductId === item.productId;

    if (isCurrentlyReviewing) {
        return null; // The form will be shown underneath the row
    }

    return (
        <div className="mt-3">
            {myReview ? (
                <button
                    onClick={() => setReviewingProductId(item.productId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors"
                >
                    <Pencil size={12} />
                    Edit Review
                </button>
            ) : (
                <button
                    onClick={() => setReviewingProductId(item.productId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#006bc0] hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                    <Star size={12} className="fill-current" />
                    Write Review
                </button>
            )}
        </div>
    );
};

export default OrderProductReviewAction;
