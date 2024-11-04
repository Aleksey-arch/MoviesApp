import { API_KEY } from '../config/constants';

export const getTrendingMovies = async (timeInterval) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${timeInterval}?language=ru-RU`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// https://api.themoviedb.org/3/trending/movie/day?language=ru-RU
