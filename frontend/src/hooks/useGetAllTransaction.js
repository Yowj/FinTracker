import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../services/api";

const useGetAllTransaction = (userId) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions(userId),
    enabled: !!userId, // Only fetch if userId exists
    onSuccess: () => queryClient.invalidateQueries(["authUser"]),
  });

  return {
    transactions: data?.transactions,
    isLoading,
    error,
    refetch,
  };
};

export default useGetAllTransaction;
