import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('For You');
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('https://cms.samespace.com/items/songs');
        const data = await response.json();
        setSongs(data.data);
        setCurrentSong(data.data[0]);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const playNextSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    playSong(nextSong);
  };

  const playPreviousSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    playSong(previousSong);
  };

  const seekTo = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <AudioContext.Provider
      value={{
        songs,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        activeTab,
        setActiveTab,
        playSong,
        pauseSong,
        playNextSong,
        playPreviousSong,
        seekTo,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);