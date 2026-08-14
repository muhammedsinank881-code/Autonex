import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../api/order.api";
import { useNavigate } from "react-router-dom";

const useCancelOrder = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (data, orderId) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders", orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders", "all"],
      });

      navigate(-1)
    },
  });
};

export default useCancelOrder;