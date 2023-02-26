import { useCallback, useEffect, useRef, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, Grid, GridItem, CardItem } from 'components';
import { SearchFormFoImg } from 'components/SearchForm/SearchFormFoImg';

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('sport');

  const imagesRef = useRef(null);
  const imagesLengthRef = useRef(null);

  const fetchImages = useCallback(async () => {
    const { photos } = await ImageService.getImages(query, page);
    setPhotos(prevPhotos => (page > 1 ? [...prevPhotos, ...photos] : photos));
  }, [page, query]);

  useEffect(() => {
    fetchImages();
    imagesLengthRef.current = photos.length;
  }, [fetchImages, page, photos.length, query]);

  useEffect(() => {
    if (page > 1) {
      imagesRef.current.children[imagesLengthRef.current].scrollIntoView({
        behavior: 'smooth',
      });
      // console.log(imagesLengthRef.current);
      // console.log(photos.length);
    }
  }, [page, photos.length]);

  const handleSearchSubmit = query => {
    setPage(1);
    setQuery(query);
  };

  const ChangeClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchFormFoImg onSubmit={handleSearchSubmit} />
      <Grid ref={imagesRef}>
        {photos.map(({ id, avg_color, alt, src }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img src={src.large} alt={alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      <Button onClick={ChangeClick}>LoadMore</Button>

      {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
    </>
  );
};
