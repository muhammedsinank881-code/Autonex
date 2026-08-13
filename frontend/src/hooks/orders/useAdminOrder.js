import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../api/order.api";

const useAdminOrder = (orderId) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export default useAdminOrder;