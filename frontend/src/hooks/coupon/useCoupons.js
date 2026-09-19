import { useQuery } from "@tanstack/react-query";

import { getCoupons } from "../../api/coupon.api.js";

export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons,
    staleTime: 1000 * 60 * 60 * 12,

  });
};