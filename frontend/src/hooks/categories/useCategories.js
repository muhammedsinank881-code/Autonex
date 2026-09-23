import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category.api.js";

export const useCategories = ({ page = 1, search = "",limit = 10, enabled = true, } = {}) => {
  return useQuery({
    queryKey: ["categories", page, search,limit ],
    queryFn: () => getCategories({ page, search,limit }),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
