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
import MyContext from '../../entities/movie/MyContext';

export function MainPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [valueInput, setValueInput] = useState('');
  const [pageNumber, setPageNumber] = useState('2');
  const [totalPage, setTotalPage] = useState(5);
  const [paginationNumber, setPaginationNumber] = useState('1');
  const [timeInterval, setTimeInterval] = useState('day');
  const [starValue, setStarValue] = useState(0);
  const [localStorageData, setLocalStorageData] = useState(null);

  const debouncedValue = useDebounce(valueInput, 1000);

  const onChangeInput = (value) => {
    return setValueInput(value.trim());
  };

  useEffect(() => {
    setError(true);
    setMovies([]);
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await MoviesApi.getSearchMovies(debouncedValue, paginationNumber);
        if (data.results.length === 0 && pageNumber === '1') {
          setError(true);
        }
        setMovies(data.results);
        setTotalPage(data.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedValue, paginationNumber]);

  useEffect(() => {
    if (
      (pageNumber === '2' && timeInterval === 'day') ||
      (pageNumber === '2' && timeInterval === 'week')
    ) {
      setError(null);
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
    }
  }, [timeInterval]);

  useEffect(() => {
    const allLocalStorageData = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        allLocalStorageData.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setLocalStorageData(allLocalStorageData);
  }, [pageNumber, timeInterval]);

  useEffect(() => {
    if (pageNumber === '2' && timeInterval === 'rated') {
      setMovies([]);
      if (localStorageData !== null) {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const data = await MoviesApi.getRatedMovies(localStorageData);
            if (data.length === 0) {
              setError(true);
            } else {
              setMovies(data);
              setError(false);
            }
          } catch (err) {
            setError(err);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      } else if (localStorageData === null && pageNumber === '2' && timeInterval === 'rated') {
        setIsLoading(true);
      }
    }
  }, [localStorageData]);

  const onChangeTabsPage = (key) => {
    setPageNumber(key);
  };
  const onChangeTabsRating = (key) => {
    setTimeInterval(key);
  };
  const movieItem = movies.map((movie) => {
    return <MovieCard key={movie.id} data={movie} localStorageData={localStorageData} />;
  });

  return (
    <MyContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        localStorageData,
        setLocalStorageData
      }}
    >
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
                  <div className={classes.pagination}>
                    <Pagination
                      align="center"
                      total={totalPage}
                      showSizeChanger={false}
                      onChange={(e) => {
                        setPaginationNumber(e);
                      }}
                      current={paginationNumber}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
}

// end
