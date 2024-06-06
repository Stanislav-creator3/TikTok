import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";

import style from "./videos.module.scss";
import { formatNum } from "../utils/common";

const VideoDetails = ({
  play_count: playCount,
  digg_count: diggCount,
  comment_count: commentCount,
  share_count: shareCount,
}) => {
  const details = [
    {
      icon: <FavoriteIcon />,
      count: diggCount,
    },
    {
      icon: <ChatBubbleIcon />,
      count: commentCount,
    },
    {
      icon: <PlayArrowIcon />,
      count: playCount,
    },
    {
      icon: <ShareIcon />,
      count: shareCount,
    },
  ];
  return (
    <div className={style["video-details"]}>
      {details.map(({ icon, count }, i) => (
        <li key={i} className={style["video-details__item"]}>
          {icon}
          <p className={style["video-details__count"]}>{formatNum(count)}</p>
        </li>
      ))}
    </div>
  );
};

export default VideoDetails;
