import { useInfiniteQuery } from "@tanstack/react-query";
import { request } from "../components/utils/common";
import { REGION } from "../components/utils/constanst";
import { useState } from "react";

const getSearchFeedByKeywords = async ({ keywords, cursor }) => {
  const response = await request({
    path: `feed/search?keywords=${keywords}&count=10&cursor=${cursor}&region=${REGION}`,
  });

  return response;
};

export const useSearch = () => {
  const [params, setParams] = useState({
    keywords: "",
    cursor: 0,
  });
  const { data, isLoading, hasNextPage, fetchNextPage, isFetched } =
    useInfiniteQuery({
      queryKey: ["searchFeed", params.keywords],
      queryFn: ({ pageParam = params }) => getSearchFeedByKeywords(pageParam),
      getNextPageParam: ({ data }) => {
        return data?.hasMore ? { ...params, cursor: data?.cursor } : undefined;
      },
      enabled: !!params.keywords,
    });

  return {
    data: data?.pages || [],
    isLoading,
    isFetched,
    setParams,
    hasNextPage,
    fetchNextPage,
  };
};
