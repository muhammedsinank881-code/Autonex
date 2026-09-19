import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCoupon } from "../../api/coupon.api.js";

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCoupon(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });

      queryClient.invalidateQueries({
        queryKey: ["coupon", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["featured-coupon"],
      });
    },
  });
};
