import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../../api/brand.api";

export const useBrands = ({ page = 1,limit = 10, search = "" } = {}) => {
  return useQuery({
    queryKey: ["brands", page, search, limit],
    queryFn: () => getBrands({ page, search, limit }),
    staleTime: 1000 * 60 * 15,
  });
};
