import React from "react";
import ReviewForm from "../../../components/reviews/ReviewForm";
import useMyReview from "../../../hooks/reviews/useMyReview";

const OrderProductReviewInlineForm = ({ item, orderId, onCancel, onSuccess }) => {
    const { data: myReviewData, isLoading } = useMyReview(item.productId);
    const existingReview = myReviewData?.data;

    if (isLoading) {
        return (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-3 animate-pulse text-xs text-slate-500">
                Loading review details...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl mt-3 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded shadow-sm shrink-0 border border-slate-200 bg-white"
                    />
                ) : (
                    <div className="w-10 h-10 bg-white rounded border border-slate-200 shrink-0" />
                )}
                <div>
                    <h4 className="text-sm font-bold text-slate-700">
                        {existingReview ? "Edit Your Review" : "Write a Review"}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium truncate">{item.name}</p>
                </div>
            </div>

            <ReviewForm
                productId={item.productId}
                eligibleOrderId={orderId}
                existingReview={existingReview}
                onCancel={onCancel}
                onSuccess={onSuccess}
            />
        </div>
    );
};

export default OrderProductReviewInlineForm;
