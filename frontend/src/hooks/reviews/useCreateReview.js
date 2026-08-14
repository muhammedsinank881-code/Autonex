import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createReview } from "../../api/review.api";

const useCreateReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (data) => {
      toast.success(data.message || "Review submitted successfully!");

      // Refresh the product's review list
      queryClient.invalidateQueries({
        queryKey: ["reviews", "product", productId],
      });

      // Refresh the user's own review state for this product
      queryClient.invalidateQueries({
        queryKey: ["reviews", "my", productId],
      });

      // Refresh the product itself (averageRating and reviewCount updated on backend)
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit review"
      );
    },
  });
};

export default useCreateReview;
