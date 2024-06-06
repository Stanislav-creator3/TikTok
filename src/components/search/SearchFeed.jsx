import React, { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoItem from "../videos/VideoItem";
import Spinner from "../spinner/Spinner";

import style from "./search.module.scss";

const SearchFeed = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data, hasNextPage, isFetched, fetchNextPage, setParams } =
    useSearch();

  useEffect(() => {
    setParams((__params) => ({ ...__params, keywords: query }));
  }, [setParams, query]);
  return (
    <div className={style.container}>
      {data.map(({ data: { videos } }, i) => {
        return !videos.length ? (
          <div key={i}>
            <Alert severity="error">
              {" "}
              По запросу {query} ничего не найдено{" "}
            </Alert>
          </div>
        ) : (
          <Fragment key={i}>
            <InfiniteScroll
              dataLength={videos.length}
              scrollThreshold={"600px"}
              hasMore={hasNextPage}
              next={fetchNextPage}
            >
              <div className={style["container__item"]}>
                {videos.map((video) => (
                  <VideoItem key={video.video_id} {...video} />
                ))}
              </div>
            </InfiniteScroll>
          </Fragment>
        );
      })}

      {isFetched && <div><Spinner /></div> }
    </div>
  );
};

export default SearchFeed;
