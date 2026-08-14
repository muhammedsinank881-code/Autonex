import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../api/order.api";

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,

    onSuccess: (data, variables) => {
      toast.success("Order status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    },
  });
};

export default useUpdateOrderStatus;