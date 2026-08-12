import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api/order.api";

const useAllOrders = ({
  page = 1,
  limit = 10,
  search = "",
  date = "",
} = {}) => {
  return useQuery({
    queryKey: ["orders", page, limit, search, date],

    queryFn: () =>
      getAllOrders({
        page,
        limit,
        search,
        date,
      }),

    keepPreviousData: true,
  });
};

export default useAllOrders;