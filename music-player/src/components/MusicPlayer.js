import React, { useState, useEffect } from 'react';
import { Search, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useColorExtractor } from '../hooks/useColorExtractor';

import ProfileImage from '../components/Profile.png';
import VolumeImage from '../components/volume.png';
import MoreImage from '../components/more.png';

import {
  Container,
  Sidebar,
  MainContent,
  TabContainer,
  TabButton,
  SearchContainer,
  SearchInput,
  SongList,
  SongItem,
  SongInfo,
  SongTitle,
  SongArtist,
  PlayerContainer,
  CoverImage,
  TrackTitle,
  ArtistName,
  Controls,
  PlayButton,
  ControlButton,
  Seeker
} from '../styles/StyledComponents';

export const MusicPlayer = () => {
  const { 
    songs, 
    currentSong, 
    isPlaying, 
    activeTab, 
    setActiveTab,
    playSong,
    pauseSong,
    playNextSong,
    playPreviousSong,
    currentTime,
    seekTo
  } = useAudio();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [songDurations, setSongDurations] = useState({});
  const [currentDuration, setCurrentDuration] = useState(0);
  const backgroundColor = useColorExtractor(currentSong?.cover);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const filteredSongs = songs.filter(song => 
    song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load durations for all songs
  useEffect(() => {
    songs.forEach((song) => {
      if (!songDurations[song.id] && song.url) {
        const audio = new Audio(song.url);
        audio.addEventListener('loadedmetadata', () => {
          setSongDurations(prev => ({
            ...prev,
            [song.id]: audio.duration
          }));
        });
      }
    });
  }, [songs]);

  // Update current song duration
  useEffect(() => {
    if (currentSong?.url) {
      const audio = new Audio(currentSong.url);
      audio.addEventListener('loadedmetadata', () => {
        setCurrentDuration(audio.duration);
      });
      return () => audio.removeEventListener('loadedmetadata', () => {});
    }
  }, [currentSong]);

  return (
    <Container style={{ background: `linear-gradient(to bottom right, ${backgroundColor}, rgb(23, 23, 23))` }}>
      <div style={{ position: 'relative', height: '100vh', width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <img 
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" 
          alt="Spotify Logo" 
          style={{ width: '120px', height: '40px', position: 'absolute', top: '20px', left: '20px' }} 
        />
        <img 
          src={ProfileImage}
          alt="Profile"
          style={{ width: '40px', height: '40px', position: 'absolute', bottom: '30px', left: '19px' }} 
        />
      </div>

      <Sidebar style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '20px',
        borderColor:'transparent'
      }}>
        <TabContainer style={{ gap: '10px', marginTop:'10px' }}>
          <TabButton style={{fontFamily:"inter", fontWeight:"700",fontSize:"19px"}} 
            active={activeTab === 'For You'} 
            onClick={() => setActiveTab('For You')}
          >
            For You
          </TabButton>
          <TabButton style={{marginLeft:"15px",fontFamily:"inter", fontWeight:"700"}}
            active={activeTab === 'Top Tracks'} 
            onClick={() => setActiveTab('Top Tracks')}
          >
            Top Tracks
          </TabButton>
        </TabContainer>

        <SearchContainer>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Song, Artist"
          />
          <Search 
            style={{ 
              position: 'absolute', 
              right: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.6)'
            }} 
          />
        </SearchContainer>

        <SongList>
          {filteredSongs.map((song) => (
            <SongItem 
              key={song.id}
              active={currentSong?.id === song.id}
              onClick={() => playSong(song)}
            >
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <SongInfo>
                <div style={{display:"flex"}}>
                  <div style={{width:"200px"}}>
                <SongTitle>{song.name}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>
                  </div>
                <SongInfo style={{marginTop:"10px"}}>{formatTime(songDurations[song.id])}</SongInfo>
                </div>
              </SongInfo>
            </SongItem>
          ))}
        </SongList>
      </Sidebar>
      <MainContent>
        {currentSong && (
          <PlayerContainer style={{padding:"20px"}}>
            <div style={{display:"flex",flexDirection:"column",textJustify:"start"}}>
            <TrackTitle style={{fontSize:"25px",alignSelf:"start"}}>{currentSong.name}</TrackTitle>
            <ArtistName style={{alignSelf:"start"}}>{currentSong.artist}</ArtistName>
            </div>
            <CoverImage 
              style={{marginLeft:"-20px"}}
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.name}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '10px 0' }}>
              <Seeker
                min="0"
                max={currentDuration || 0}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
              />
            </div>

            <Controls>
              <img 
                src={MoreImage}
                alt="More" 
                style={{ width: '40px', height: '40px', bottom: '30px' }} 
              />
              <ControlButton onClick={playPreviousSong} style={{marginLeft:"60px"}}>
                <SkipBack size={28} />
              </ControlButton>
              <PlayButton onClick={isPlaying ? pauseSong : () => playSong(currentSong)}>
                {isPlaying ? 
                  <Pause size={28} style={{ color: 'black' }} /> : 
                  <Play size={28} style={{ color: 'black' }} />
                }
              </PlayButton>
              <ControlButton onClick={playNextSong} style={{marginRight:"60px"}}>
                <SkipForward size={28} />
              </ControlButton>
              <img 
                src={VolumeImage}
                alt="Volume" 
                style={{ width: '45px', height: '45px', bottom: '20px' }} 
              />
            </Controls>
          </PlayerContainer>
        )}
      </MainContent>
    </Container>
  );
};