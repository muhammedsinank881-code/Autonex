import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../api/order.api";

const useMyOrders = () => {
  return useQuery({
    queryKey: ["orders", "me"],
    queryFn: getMyOrders,
  });
};

export default useMyOrders;