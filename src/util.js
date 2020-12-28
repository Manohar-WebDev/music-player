export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((audio) => {
          audioRef.current.play();
        })
        .catch((error) => console.log(error));
    }
  }
};

export const toggleActiveState = (songs, song) => {
  const inactiveSongs = songs.filter((eachsong) => eachsong.id !== song.id);
  inactiveSongs.map((eachmap) => (eachmap.active = false));
};
