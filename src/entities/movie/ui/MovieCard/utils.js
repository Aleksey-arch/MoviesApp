import { format, isValid } from "date-fns";
import { ru } from "date-fns/locale";

export const serializeSearchMovie = (movie) => ({
  ...movie,
  releaseDate: isValid(movie?.releeseDate)
    ? format(new Date(movie?.releeseDate), "dd MMMM, yyyy", {
        locale: ru,
      })
    : "-",
});
