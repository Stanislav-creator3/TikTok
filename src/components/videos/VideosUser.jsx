import React from "react";
import { Link } from "react-router-dom";

import style from "./videos.module.scss";

const VideosUser = ({ unique_id: uniqueId, nickname, avatar }) => {
  return (
    <Link to={`/user/${uniqueId}`} className={style["video-author"]}>
      <div
        className={style["video-author__image"]}
        style={{ backgroundImage: `url(${avatar})` }}
      />
      <div className={style["video-author__info"]}>
        <p className={style["video-author__nickname"]}>{nickname}</p>
        <span className={style["video-author__uniqueId"]}>{uniqueId}</span>
      </div>
    </Link>
  );
};

export default VideosUser;
