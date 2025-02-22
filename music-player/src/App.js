import React from 'react';
import { AudioProvider } from './context/AudioContext';
import { MusicPlayer } from './components/MusicPlayer';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <AudioProvider>
      <GlobalStyles />
      <MusicPlayer />
    </AudioProvider>
  );
}

export default App;