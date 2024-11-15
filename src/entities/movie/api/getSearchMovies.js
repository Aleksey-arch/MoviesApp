import { API_KEY } from '../config/constants';

export const getSearchMovies = async (query, paginationPage) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=ru-RU&page=${paginationPage}`,
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
