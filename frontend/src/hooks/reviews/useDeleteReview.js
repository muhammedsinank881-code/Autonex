import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteReview } from "../../api/review.api";

const useDeleteReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: (data) => {
      toast.success(data.message || "Review deleted successfully!");

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
        "Failed to delete review"
      );
    },
  });
};

export default useDeleteReview;
