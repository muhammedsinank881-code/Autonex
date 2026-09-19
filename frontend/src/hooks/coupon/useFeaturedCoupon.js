import { useQuery } from "@tanstack/react-query";

import { getFeaturedCoupon } from "../../api/coupon.api.js";

export const useFeaturedCoupon = () => {
  return useQuery({
    queryKey: ["featured-coupon"],
    queryFn: getFeaturedCoupon,
    staleTime: 1000 * 60 * 60 * 12,
  });
};
