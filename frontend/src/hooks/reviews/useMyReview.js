import { useQuery } from "@tanstack/react-query";
import { getMyReviewForProduct } from "../../api/review.api";
import { useSelector } from "react-redux";

const useMyReview = (productId) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return useQuery({
    queryKey: ["reviews", "my", productId],
    queryFn: () => getMyReviewForProduct(productId),
    enabled: !!productId && isAuthenticated,
  });
};

export default useMyReview;
