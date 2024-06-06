import { useQuery } from "@tanstack/react-query";
import { request } from "../components/utils/common";

const getSingleVideo = async (uniqueId, id) => {
  const response = await request({
    method: 'POST',
    path: "",
    body: new URLSearchParams({
      url: `https://www.tiktok.com/@${uniqueId}/video/${id}`,
      hd: "1",
    }),
  });

  return response;
};

export const useVideo = (uniqueId, id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["singleVideo", id, uniqueId],
    queryFn: () => getSingleVideo(uniqueId, id),
  });

  return { data: data?.data || {}, isLoading };
};
