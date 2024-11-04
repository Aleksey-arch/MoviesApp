import { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { useDebounce } from 'use-lodash-debounce';
import { MoviesApi } from '../../entities/movie/api';
import { MovieCard } from '../../entities/movie/ui/MovieCard';
import classes from './index.module.css';
import { SearchInput } from './components/SearchInput';
import { TabsComponent } from './components/TabsComponent';
import { ErrorOutput } from './components/ErrorOutput';
import { TabsRating } from './components/TabsRating';

export function MainPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [pageNumber, setPageNumber] = useState('2');
  const [timeInterval, setTimeInterval] = useState('day');

  const debouncedValue = useDebounce(valueInput, 1000);

  const onChangeInput = (value) => {
    return setValueInput(value.trim());
    // eslint-disable-next-line no-unreachable
  };

  useEffect(() => {
    console.log('debouncedValue', debouncedValue);
    setSearch(valueInput);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await MoviesApi.getSearchMovies(search);
        setMovies(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedValue]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await MoviesApi.getTrendingMovies(timeInterval);
        setMovies(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeInterval]);

  const onChangeTabsPage = (key) => {
    setPageNumber(key);
  };
  const onChangeTabsRating = (key) => {
    setTimeInterval(key);
  };

  const movieItem = movies.map((movie) => {
    return <MovieCard key={movie.id} data={movie} />;
  });

  return (
    <div>
      <div className={classes.containerPage}>
        <div className={classes.content}>
          <TabsComponent onChangeTabsPage={onChangeTabsPage} pageNumber={pageNumber} />

          {pageNumber === '2' ? (
            <TabsRating onChangeTabsRating={onChangeTabsRating} ratingByTime={timeInterval} />
          ) : null}

          {pageNumber === '1' ? <SearchInput onChange={onChangeInput} /> : null}

          {isLoading ? (
            <Spin className={classes.spin} size="large" />
          ) : (
            <>
              {error ? <ErrorOutput error={error} /> : null}

              <div className={classes.containerItems}>{movieItem}</div>

              {pageNumber === '1' ? (
                <Pagination align="center" defaultCurrent={1} total={50} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// <div className={classes.containerPage}>
//   {isLoading ? (
//     <Spin className={classes.spin} size="large" />
//   ) : (
//     <div className={classes.content}>
//       <TabsComponent onChangeTabsPage={onChangeTabsPage} pageNumber={pageNumber} />
//
//       {pageNumber === '2' ? (
//         <TabsRating onChangeTabsRating={onChangeTabsRating} ratingByTime={timeInterval} />
//       ) : null}
//
//       {pageNumber === '1' ? <SearchInput onChange={onChangeInput} /> : null}
//
//       {error ? <ErrorOutput error={error} /> : null}
//
//       <div className={classes.containerItems}>{movieItem}</div>
//
//       {pageNumber === '1' ? (
//         <Pagination align="center" defaultCurrent={1} total={50} />
//       ) : null}
//     </div>
//   )}
// </div>
