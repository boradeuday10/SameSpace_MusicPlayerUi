import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';

export const useColorExtractor = (imageUrl) => {
  const [backgroundColor, setBackgroundColor] = useState('rgb(23, 23, 23)');

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = `https://cms.samespace.com/assets/${imageUrl}`;

    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setBackgroundColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, [imageUrl]);

  return backgroundColor;
};