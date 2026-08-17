import { useQuery } from "@tanstack/react-query";
import { getPublicBlogs, getAdminBlogs, getBlogBySlug, getAdminBlogById } from "../../api/blog.api";

export const usePublicBlogs = (params) => {
  return useQuery({
    queryKey: ["publicBlogs", params],
    queryFn: () => getPublicBlogs(params),
    keepPreviousData: true,
  });
};

export const useAdminBlogs = (params) => {
  return useQuery({
    queryKey: ["adminBlogs", params],
    queryFn: () => getAdminBlogs(params),
    keepPreviousData: true,
  });
};

export const useBlogBySlug = (slug) => {
  return useQuery({
    queryKey: ["blogSlug", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
};

export const useAdminBlogById = (id) => {
  return useQuery({
    queryKey: ["adminBlogId", id],
    queryFn: () => getAdminBlogById(id),
    enabled: !!id,
  });
};
