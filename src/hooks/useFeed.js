import { useQuery } from "@tanstack/react-query";
import { request } from "../components/utils/common";
import { REGION } from "../components/utils/constanst";

const getFeed = async () => {
  const response = await request({
    path: `feed/list?region=${REGION}&count=20`,
  });

  return response;
};

export const useFeed = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });

  return { data: data?.data || [], isLoading };
};
