import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../../api/review.api";

const useProductReviews = (productId, page = 1) => {
  return useQuery({
    queryKey: ["reviews", "product", productId, page],
    queryFn: () => getProductReviews({ productId, page, limit: 10 }),
    enabled: !!productId,
    placeholderData: (previousData) => previousData,
  });
};

export default useProductReviews;
