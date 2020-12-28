// import Icons and helping components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPlay,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { playAudio, toggleActiveState } from "../util";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  currentSong,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  // console.log(audioRef);
  //audioRef.current
  const playSongHandler = (e) => {
    //console.log(audioRef.current);
    //audioRef.current.play();
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
      // console.log(audioRef);
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };

  const formatTimeHandler = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const updateInputHandler = (e) => {
    //console.log(e);
    audioRef.current.currentTime = e.target.value;
  };

  const skipTrackHandler = (direction) => {
    const index = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      const forwardIndex = (index + 1) % songs.length;
      setCurrentSong(songs[forwardIndex]);
      //  console.log(audioRef.current);
      songs[forwardIndex].active = true;
      toggleActiveState(songs, songs[forwardIndex]);
    }

    if (direction === "skip-backward") {
      const backwardIndex = index === 0 ? songs.length - 1 : index - 1;

      setCurrentSong(songs[backwardIndex]);
      songs[backwardIndex].active = true;
      toggleActiveState(songs, songs[backwardIndex]);
    }
    //console.log(audioRef.current);
    playAudio(isPlaying, audioRef);
    setIsPlaying(true);

    // audioRef.current.play();
  };

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div>
      <div className="player">
        <div className="time-control">
          <p>{formatTimeHandler(songInfo.currentTime)}</p>
          <div
            style={{
              background: `linear-gradient(to right,${currentSong.color[1]},${currentSong.color[0]})`,
            }}
            className="track"
          >
            <input
              onChange={updateInputHandler}
              min={0}
              value={songInfo.currentTime}
              max={songInfo.duration || 0}
              type="range"
            />
            <div style={trackAnimation} className="animate-track"></div>
          </div>
          <p>{formatTimeHandler(songInfo.duration)}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon
            onClick={() => skipTrackHandler("skip-backward")}
            className="skip-back"
            size="2x"
            icon={faAngleLeft}
          />
          <FontAwesomeIcon
            onClick={playSongHandler}
            className="play"
            size="2x"
            icon={currentSong.active && !isPlaying ? faPlay : faPause}
          />
          <FontAwesomeIcon
            onClick={() => skipTrackHandler("skip-forward")}
            className="skip-forward"
            size="2x"
            icon={faAngleRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
