import React from "react";
import { MusicNote } from "@mui/icons-material";

import { useFeed } from "../../hooks/useFeed";

import VideosUser from "../videos/VideosUser";
import VideoDetails from "../videos/VideoDetails";
import Spinner from "../spinner/Spinner";
import Video from "../videos/Video";

import style from "../videos/videos.module.scss";
import styleFeed from "./feed.module.scss"

const Feed = () => {
  const { data: feed, isLoading } = useFeed();

  return (
    !isLoading ?  <div className={styleFeed.feed}>
      {feed.map(
        ({
          video_id: videoId,
          title,
          play,
          music_info: { title: songTitle },
          author,
          ...rest
        }) => {
          return (
            <div className={style.video} key={videoId}>
              <VideosUser {...author} />
              <div className={style["video-wrapper"]}>
                <Video height="600px" url={play} videoId={videoId} uniqueId={author.unique_id}/>
                <VideoDetails {...rest} />
              </div>
              <div className={style["video-music"]}>
                <span>Original:</span>
                <MusicNote />
                <p className={style["video-music__title"]}>{songTitle}</p>
              </div>
              <div className={style["video-title"]}>{title}</div>
            </div>
          );
        }
      )}
    </div> : <Spinner/>
  );
};

export default Feed;
