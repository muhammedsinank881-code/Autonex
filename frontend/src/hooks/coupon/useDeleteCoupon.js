import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCoupon } from "../../api/coupon.api.js";

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCoupon,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["coupons"],
      });

      queryClient.invalidateQueries({
        queryKey: ["coupon", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["featured-coupon"],
      });
    },
  });
};
