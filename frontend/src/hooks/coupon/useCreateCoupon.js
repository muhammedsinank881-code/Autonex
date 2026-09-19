import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCoupon } from "../../api/coupon.api.js";

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoupon,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });

      queryClient.invalidateQueries({
        queryKey: ["featured-coupon"],
      });
    },
  });
};