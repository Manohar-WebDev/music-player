import { useRef, useState } from "react";
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import data from "./data";
import "./styles/App.scss";

function App() {
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[13]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [toggleLibrary, setToggleLibrary] = useState(true);
  const audioRef = useRef(null);
  // console.log(currentSong);
  const timeUpdateHandler = (e) => {
    // console.log(e.target.currentTime);
    const roundedTime = Math.round(e.target.currentTime);
    const roundedDuration = Math.round(e.target.duration);
    const animate = Math.round((roundedTime / roundedDuration) * 100);
    //console.log(animate);
    setSongInfo({
      ...setSongInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
      animationPercentage: animate,
    });
    //console.log(e.target.duration);
  };

  const onSongEndHandler = (e) => {
    const index = songs.findIndex((song) => song.id === currentSong.id);
    //console.log(e);

    const forwardIndex = (index + 1) % songs.length;
    setCurrentSong(songs[forwardIndex]);
    console.log(audioRef);
    if (isPlaying) {
      audioRef.current.autoplay = true;
      //  audioRef.current.volume = 1;
    }

    // playAudio(isPlaying, audioRef);
  };
  return (
    <div className="App">
      <Nav toggleLibrary={toggleLibrary} setToggleLibrary={setToggleLibrary} />
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        toggleLibrary={toggleLibrary}
      />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={onSongEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
