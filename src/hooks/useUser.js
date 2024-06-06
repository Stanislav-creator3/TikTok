import { useQuery } from "@tanstack/react-query";
import { request } from "../components/utils/common";
import { REGION } from "../components/utils/constanst";

const getUser = async (uniqueId) => {
  const response = await request({
    path: `user/info?unique_id=${uniqueId}`,
  });

  return response;
};

export const useUser = (uniqueId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", uniqueId],
    queryFn: () => getUser(uniqueId),
  });

  return {
    data: data?.data || {},
    isLoading,
    code: data?.code,
    error: data?.msg,
  };
};
