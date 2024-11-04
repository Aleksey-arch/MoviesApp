import { API_KEY } from '../config/constants';

export const getGenres = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
