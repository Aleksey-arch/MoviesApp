import { Card, Image, Typography, ConfigProvider, Tag, Flex, Rate } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ru } from 'date-fns/locale';
import { getGenres } from '../../api/getGenres';
import classes from './index.module.css';

const { Title } = Typography;

export function MovieCard({ data }) {
  const [arrGenres, setArrGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    id,
    overview: description,
    genre_ids: arrIdGenres,
    poster_path: cardImage,
    vote_average: rating,
    release_date: releeseDate
  } = data;

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

    fetchGenres();
  }, [id]);

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
            width={183}
            height={277}
            className={classes.cardImage}
            src={`https://image.tmdb.org/t/p/original/${cardImage}`}
            alt="Not image"
          />

          <div className={classes.cardInfo}>
            <h1 className={classes.cardTitle}>{title}</h1>
            <p className={classes.date}>
              {format(new Date(releeseDate), 'dd MMMM, yyyy', {
                locale: ru
              })}
            </p>
            <div className={classes.wrapperTags}>
              <Flex wrap="wrap" gap="8px 0">
                {itemTag}
              </Flex>
            </div>

            <div className={classes.containerDescription}>
              <p className={classes.cardParagraph}>{lengthDescription(description)}</p>
            </div>
            <div className={classes.estimation}>{rating.toFixed(1)}</div>
            <Rate count={10} defaultValue={5} rootClassName={classes.rate} />
          </div>
        </div>
      </Card>
    </ConfigProvider>
  );
}
