import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  height: 100vh;
  transition: background 1s ease;
`;

export const Sidebar = styled.div`
  width: 400px;
  padding: 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
`;

export const TabButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  transition: color 0.3s ease;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const SongList = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SongItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const SongInfo = styled.div`
  margin-left: 16px;
  flex: 1;
`;

export const SongTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  font-family: "Inter", serif;
`;

export const SongArtist = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Inter", serif;
`;

export const PlayerContainer = styled.div`
  width: 500px;
  text-align: center;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  margin-bottom: 32px;
  object-fit: cover;
`;

export const TrackTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: "Inter", serif;
`;

export const ArtistName = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  font-family: "Inter", serif;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const PlayButton = styled.button`
  background: white;
  border-radius: 50%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ControlButton = styled.button`
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export const Seeker = styled.input.attrs({ type: 'range' })`
  width: 100%;
  margin-bottom: 32px;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    margin-top: -6px;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
`;