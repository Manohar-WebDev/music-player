import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setSongs,
}) => {
  const playSongHandler = (e) => {
    //console.log(song);
    //console.log(audioRef.current.paused);
    setCurrentSong(song);
    setIsPlaying(true);
    //console.log(isPlaying);
    audioRef.current.autoplay = true;
    //  audioRef.current.paused = false;
    song.active = true;
    const inactiveSongs = songs.filter((eachsong) => eachsong.id !== song.id);
    inactiveSongs.map((eachmap) => (eachmap.active = false));
    //console.log(inactiveSongs);
  };

  return (
    <div
      onClick={playSongHandler}
      className={`library-container ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="audio" />
      <div className="songinfo">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
