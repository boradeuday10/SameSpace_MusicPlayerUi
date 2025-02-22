import React from 'react';
import { useAudio } from '../context/AudioContext';

export const TabSelector = () => {
  const { activeTab, setActiveTab } = useAudio();

  return (
    <div className="flex gap-8 text-lg mb-8">
      <button 
        className={`font-medium transition-colors ${
          activeTab === 'For You' ? 'text-white' : 'text-neutral-400'
        }`}
        onClick={() => setActiveTab('For You')}
      >
        For You
      </button>
      <button 
        className={`font-medium transition-colors ${
          activeTab === 'Top Tracks' ? 'text-white' : 'text-neutral-400'
        }`}
        onClick={() => setActiveTab('Top Tracks')}
      >
        Top Tracks
      </button>
    </div>
  );
};