import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/api";

const useLogOut = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return {
    logoutMutation: mutate,
    isPending,
    error,
  };
};

export default useLogOut;
