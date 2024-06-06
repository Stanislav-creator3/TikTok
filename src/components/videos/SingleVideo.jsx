import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVideo } from "../../hooks/useVideo";

import VideosUser from "./VideosUser";
import Video from "./Video";
import Spinner from "../spinner/Spinner";

import style from "./videos.module.scss";
import { Close, MusicNote } from "@mui/icons-material";
import { useComments } from "../../hooks/useCommnets";

const SingleVideo = () => {
  const navigate = useNavigate()
  const { id, uniqueId } = useParams();
  const { comments, isLoadingComments } = useComments({ id, cursor: 0 });
  const { data, isLoading } = useVideo(uniqueId, id);
  if (isLoading) return <Spinner />;

  const {
    origin_cover: cover,
    hdplay,
    author,
    music_info: { title: songTitle },
    title,
  } = data;
  const handleClose = () => {
    navigate(`/user/${author.unique_id}`)
  }
  return (
    <div className={style["single-video"]}>
      <div className={style["single-video__close"]} onClick={handleClose}>
        <Close />
      </div>
      <div
        className={style["single-video__item"]}
        style={{ backgroundImage: `url(${cover})` }}
      >
        <Video url={hdplay} width="auto" height="calc(100vh - 64px)" />
      </div>

      <div className={style["single-video__info"]}>
        <div className={style["single-video__description"]}>
          <VideosUser {...author} />
          <div className={style["single-video__title"]}>{title}</div>
          <div className={style["single-video__song"]}>
            <MusicNote />
            <span>{songTitle}</span>
          </div>
        </div>
        {isLoadingComments ? (
          <Spinner />
        ) : comments.length ? (
          <ul className={style["single-video__comments"]}>
            {comments.map(({user, text, id}) => (<li key={id} className={style["single-video__comment"]}>
          <VideosUser {...user}/>
            <div className={style["single-video__comment-text"]}>
              {text}
            </div>
            </li>))}
          </ul>
        ) : (
          <p>Комментарий нету</p>
        )}
      </div>
    </div>
  );
};

export default SingleVideo;
