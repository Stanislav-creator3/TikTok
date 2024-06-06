import React from 'react'
import VideosUser from './VideosUser'
import Video from './Video'

import style from "./videos.module.scss"

const VideoItem = ({video_id: videoId, author, title, play}) => {
  return (
    <div className={style["videos-item"]}>
        <VideosUser {...author}/>
        <Video url={play} videoId={videoId} height='auto'/>
        <div className={style["video-item__title"]}>{title}</div>
    </div>
  )
}

export default VideoItem