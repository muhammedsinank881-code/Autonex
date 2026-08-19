import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { updateProfile } from "../../api/auth.api";
import { setUser } from "../../redux/slices/authSlice";

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      dispatch(setUser(data.user));

      queryClient.setQueryData(
        ["currentUser"],
        data.user
      );

      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Profile update failed."
      );
    },
  });
};