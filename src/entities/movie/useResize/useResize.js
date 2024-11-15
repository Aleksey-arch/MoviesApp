import { useState, useEffect } from 'react';
import { SCREEN_SM } from './constBreakpoints';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isScreenSm: width <= SCREEN_SM
    // isScreenMd: width >= SCREEN_MD,
    // isScreenLg: width >= SCREEN_LG,
    // isScreenXl: width >= SCREEN_XL,
    // isScreenXxl: width >= SCREEN_XXL
  };
};
