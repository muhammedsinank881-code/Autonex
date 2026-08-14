import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateReview } from "../../api/review.api";

const useUpdateReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,

    onSuccess: (data) => {
      toast.success(data.message || "Review updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["reviews", "product", productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews", "my", productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update review"
      );
    },
  });
};

export default useUpdateReview;
