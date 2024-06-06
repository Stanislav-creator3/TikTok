import React, { useRef, useState } from "react";
import style from "./videos.module.scss";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircle from "@mui/icons-material/PlayCircle";
import Spinner from "../spinner/Spinner";

const Video = ({ url = "", videoId, width = "100%", height = "576px", uniqueId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState({
    loadedSeconds: 1,
    playedSeconds: 0,
  });

  const videoRef = useRef();
  const videoRefControl = useRef();

  const handleClick = () => {
    setIsPlaying((_prev) => !_prev);
    videoRef?.current?.parentElement.classList.toggle(
      `${style["playing"]}`,
      !isPlaying
    );
  };
  const handleProgress = (e) => {
    if(!progress.seeking) {
    setProgress({ ...progress, ...e });
    }
  };

  const handleProgressTrack = (e) => {
    videoRefControl.current.seekTo(parseFloat(e));
    setProgress({ played: parseFloat(e) })
  };

  const handleSeekMouseDown = (e) => {
    setProgress({ seeking: true });
  };
  const handleSeekMouseUp = (e) => {
    setProgress({ seeking: false });
    videoRefControl.current.seekTo(parseFloat(e));
  };

  
  return (
    <div
      className={`${style[`video-item`]} ${isPlaying ? style["playing"] : ""}`}
      ref={videoRef}
    >
      {!isReady && (
        <div className={style[`video-item__loading`]}>
          <Spinner />
        </div>
      )}
      <Link to={`/video/${uniqueId}/${videoId}`}>
        <ReactPlayer
          url={url}
          ref={videoRefControl}
          width={width}
          height={height}
          value={progress.played}
          playing={isPlaying}
          onProgress={handleProgress}
          loop={true}
          onReady={() => setIsReady(true)}
        />
      </Link>

      <div className={style[`video-item__controls`]} onClick={handleClick}>
        {isPlaying ? <PauseIcon /> : <PlayCircle />}
      </div>
      <div className={style["video-progress"]}>
        <input
          className={style["video-controls"]}
          style={{
            background: `-webkit-linear-gradient(left, #8870FF 0%, #8870FF ${
              progress.played * 100
            }%, #ffff ${progress.played * 100}%, #FFFF 100%)`,
          }}
          type="range"
          value={progress.played}
          min={0}
          max={0.999999}
          step="any"
          onChange={(e) => handleProgressTrack(e.target.value)}
          onMouseDown={(e) => handleSeekMouseDown(e.target.value)}
          onMouseUp={(e) => handleSeekMouseUp(e.target.value)}
        />
        <div className={style["video-controls__item"]}></div>
      </div>
    </div>
  );
};

export default Video;
