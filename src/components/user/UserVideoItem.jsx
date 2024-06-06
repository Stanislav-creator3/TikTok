import React from "react";

import style from "./user.module.scss";
import Video from "../videos/Video";
import { PlayArrow } from "@mui/icons-material";
import { formatNum } from "../utils/common";

const UserVideoItem = ({
  video_id: videoId,
  play,
  title,
  play_count: playCount,
}) => {
  return (
    <div className={style.video}>
      <Video height="auto" videoId={videoId} url={play} />
      <div className={style["video-play__count"]}>
        <PlayArrow />
        <span>{formatNum(playCount)}</span>
      </div>
      {/* <div className={style["video-title"]}>{title}</div> */}
    </div>
  );
};

export default UserVideoItem;
