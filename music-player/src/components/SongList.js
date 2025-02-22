import React from 'react';
import { useAudio } from '../context/AudioContext';

export const SongList = ({ songs }) => {
  const { currentSong, playSong } = useAudio();

  return (
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => playSong(song)}
          className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
            currentSong?.id === song.id ? 'bg-neutral-800' : 'hover:bg-neutral-800/50'
          }`}
        >
          <img 
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt={song.name}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="ml-4 flex-1">
            <div className="text-white font-medium">{song.name}</div>
            <div className="text-sm text-neutral-400">{song.artist}</div>
            <div className="text-sm text-neutral-400">{song.duration}</div>
          </div>
        </div>
      ))}
    </div>
  );
};