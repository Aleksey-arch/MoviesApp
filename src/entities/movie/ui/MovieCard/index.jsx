import { Card, Image, Typography, ConfigProvider, Tag, Flex, Rate } from 'antd';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { ru } from 'date-fns/locale';
import { getGenres } from '../../api/getGenres';
import classes from './index.module.css';
import MyContext from '../../MyContext';
import { useResize } from '../../useResize/useResize';

const { Title } = Typography;

export function MovieCard({ data }) {
  const [arrGenres, setArrGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const { localStorageData, setLocalStorageData } = useContext(MyContext);
  const objectDataNew = {
    ...data
  };

  const {
    title,
    id,
    overview: description,
    poster_path: cardImage,
    vote_average: rating
  } = objectDataNew;

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const dataArr = await getGenres(id);
        setArrGenres(dataArr.genres);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorageData.length !== 0) {
      const indexElem = localStorageData.findIndex((item) => {
        return item.id === id;
      });
      if (indexElem !== -1 && !('newValueRated' in data)) {
        objectDataNew.newValueRated = localStorageData[indexElem].newValue;
      }
    }
    setStarValue('newValueRated' in objectDataNew ? objectDataNew.newValueRated : starValue);
    fetchGenres();
  }, [id]);

  const valueChangeHandler = (newValue) => {
    if (newValue === 0) {
      localStorage.removeItem(id);
      setStarValue(0);
    } else {
      localStorage.setItem(
        id,
        JSON.stringify({
          id,
          newValue
        })
      );
      setStarValue(newValue);
    }
  };

  let colorRating = ' ';
  if (rating >= 7) {
    colorRating = classes['green-border'];
  } else if (rating >= 5) {
    colorRating = classes['yelow-border'];
  } else if (rating >= 3) {
    colorRating = classes['orange-border'];
  } else {
    colorRating = classes['red-border'];
  }

  const itemTag = arrGenres.map((item) => {
    return (
      <Tag className={classes.containerTag} key={item.id}>
        {item.name}
      </Tag>
    );
  });
  const lengthDescription = (desc) => {
    if (desc.length < 1) {
      const descrip = 'Описания нет...';
      return descrip;
    }
    if (desc.length > 170) {
      const indexLastWhite = desc.lastIndexOf(' ', 170);
      const newDescription = desc.substring(0, indexLastWhite);
      return `${newDescription}...`;
    }
    return desc;
  };

  const releaseDate = data?.release_date
    ? format(data.release_date, 'dd MMMM , yyyy', {
        locale: ru
      })
    : 'нет даты';

  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 0
        }
      }}
    >
      <Card className={classes.card}>
        <div className={classes.cardContainer}>
          <Image
            width="100%"
            height="100%"
            className={classes.cardImage}
            src={`https://image.tmdb.org/t/p/original${cardImage}`}
            fallback={`https://via.placeholder.com/500x715/e2e2e2/black/?text=${title.split(' ').join('+')}&font=oswald.png`}
            alt="Not image"
          />

          <div className={classes.cardInfo}>
            <h1 className={classes.cardTitle}>{title}</h1>
            <p className={classes.date}>{releaseDate}</p>
            <div className={classes.wrapperTags}>
              <Flex wrap="wrap" gap="8px 0">
                {itemTag}
              </Flex>
            </div>

            <div className={classes.containerDescription}>
              <p className={classes.cardParagraph}>{lengthDescription(description)}</p>
            </div>
            <div className={[classes.estimation, colorRating].join(' ')}>{rating.toFixed(1)}</div>
            <Rate
              value={starValue}
              onChange={(e) => {
                valueChangeHandler(e);
              }}
              allowHalf
              count={10}
              allowClear
              rootClassName={classes.rate}
            />
          </div>
        </div>
      </Card>
    </ConfigProvider>
  );
}
