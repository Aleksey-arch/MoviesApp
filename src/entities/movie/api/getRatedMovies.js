import { API_KEY } from '../config/constants';

export const getRatedMovies = async (arrMovies) => {
  const ratedMovies = [];
  try {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrMovies.length; i++) {
      const elemId = arrMovies[i].id;
      const elemValue = arrMovies[i].newValue;
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(`https://api.themoviedb.org/3/movie/${elemId}?language=ru-RU`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();
      data.newValueRated = elemValue;
      ratedMovies.push(data);
    }
    return ratedMovies;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
