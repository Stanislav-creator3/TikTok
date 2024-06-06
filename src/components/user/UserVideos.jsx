import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../api";
import Spinner from "../spinner/Spinner";
import { Alert } from "@mui/material";

import style from "./user.module.scss";
import UserVideoItem from "./UserVideoItem";
import { Loop } from "@mui/icons-material";

const UserVideos = () => {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(0);
  const { uniqueId } = useParams();
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["userPosts", uniqueId, cursor],
    queryFn: () => fetchUserPosts({ uniqueId, cursor }),
    keepPreviousData: true,
  });

  useEffect(() => {
    const currentVideo = data?.data?.videos || [];

    if (!currentVideo.length) return;

    setItems((__items) => [...__items, ...currentVideo]);
  }, [data]);

  if (isLoading) return <Spinner />;

  if (isError || data?.code === -1)
    return (
      <Alert severity="error" sx={{ width: "100%" }}>
        {data?.msg || "Something went wrong. Try again later"}
      </Alert>
    );

  const {
    data: { hasMore, cursor: next },
  } = data;

  const handleLoadMore = () => setCursor(next);
  return (
    items &&
    <div className={style["user-wrapper"]}>
      {items.length ? (
        <>
          <div className={style["user-videos"]}>
            {items.map((video) => (
              <UserVideoItem key={video.video_id} {...video} />
            ))}
          </div>
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className={`${style[`user-videos__button`]} ${isFetching ? "loading" : ""}`}
            >
              <Loop />
              <span>Загрузить ещё</span>
            </button>
          )}
        </>
      ) : (
        <Alert sx={{ width: "100%" }} severity="info">
          {uniqueId} Пусто😢
        </Alert>
      )}
    </div>
  ); 
};

export default UserVideos;
