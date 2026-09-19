import { useQuery } from "@tanstack/react-query";

import { getCouponById } from "../../api/coupon.api.js";

export const useCoupon = (id) => {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getCouponById(id),
    enabled: !!id,
  });
};