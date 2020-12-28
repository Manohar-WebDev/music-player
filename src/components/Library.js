import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  currentSong,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
  toggleLibrary,
}) => {
  return (
    <div className={`library ${toggleLibrary ? "" : "minimise"}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songs={songs}
          setSongs={setSongs}
        />
      ))}
    </div>
  );
};

export default Library;
