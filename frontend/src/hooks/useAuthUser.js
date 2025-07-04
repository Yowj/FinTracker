import { QueryClient, useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../services/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale, so it refetches when invalidated
  });

  return {
    isLoading: authUser.isLoading,
    error: authUser.error,
    authUser: authUser.data?.user,
  };
};
export default useAuthUser;
