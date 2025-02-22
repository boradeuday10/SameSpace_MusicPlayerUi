import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const PlayerControls = () => {
  const { 
    currentSong, 
    isPlaying, 
    playSong, 
    pauseSong, 
    playNextSong, 
    playPreviousSong,
    currentTime,
    duration,
    seekTo
  } = useAudio();

  if (!currentSong) return null;

  return (
    <div className="w-[500px] text-center animate-fade-in">
      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt={currentSong.name}
        className="w-full aspect-square rounded-lg mb-8 object-cover"
      />
      <h2 className="text-2xl font-bold text-white mb-2">{currentSong.name}</h2>
      <p className="text-neutral-400 mb-8">{currentSong.artist}</p>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seekTo(Number(e.target.value))}
        className="w-full mb-8"
      />

      <div className="flex items-center justify-center gap-8">
        <button 
          onClick={playPreviousSong}
          className="text-neutral-400 hover:text-white transition"
        >
          <SkipBack size={28} />
        </button>
        <button 
          onClick={isPlaying ? pauseSong : () => playSong(currentSong)}
          className="bg-white rounded-full p-4 hover:scale-105 transition"
        >
          {isPlaying ? 
            <Pause size={28} className="text-black" /> : 
            <Play size={28} className="text-black" />
          }
        </button>
        <button 
          onClick={playNextSong}
          className="text-neutral-400 hover:text-white transition"
        >
          <SkipForward size={28} />
        </button>
      </div>
    </div>
  );
};