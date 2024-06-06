import { useQuery } from "@tanstack/react-query";
import { request } from "../components/utils/common";
import { REGION } from "../components/utils/constanst";

const getVideoComments = async ({id, cursor}) => {
  const response = await request({
    path: `comment/list?url=https://www.tiktok.com/video/${id}&count=10&${cursor}=0`,
  });

  return response;
};

export const useComments = (videoData) => {
  const { data, isLoading } = useQuery({
    queryKey: ["videoComments", videoData.id],
    queryFn: () => getVideoComments(videoData),
  });

  return { comments: data?.data?.comments || [], isLoadingComments: isLoading };
};
