import { useEffect, useRef, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, Grid, GridItem, CardItem } from 'components';
import { SearchFormFoImg } from 'components/SearchForm/SearchFormFoImg';

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('moto');

  const imagesRef = useRef(null);
  //  imagesRef = createRef();
  useEffect(() => {
    console.log(imagesRef);
  }, [imagesRef.current]);

  useEffect(() => {
    const fetchImages = async () => {
      const { photos } = await ImageService.getImages(query, page);
      setPhotos(prevPhotos => (page > 1 ? [...prevPhotos, ...photos] : photos));
    };
    fetchImages();
  }, [page, query]);
  // fetchImages = async () => {
  //   const { photos } = await ImageService.getImages(
  //     this.state.query,
  //     this.state.page
  //   );
  //   this.setState(prev => ({
  //     photos: prev.page > 1 ? [...prev.photos, ...photos] : photos,
  //   }));
  // };
  //  componentDidMount = async () => {
  //     const { photos } = await ImageService.getImages();
  //     this.setState({ photos });
  //   };
  // componentDidUpdate(prevProps, prevState, snapShot) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.query !== this.state.query
  //   ) {
  //     this.fetchImages();
  //   }

  //   if (snapShot) {
  //     window.scrollTo({ top: snapShot, behavior: 'smooth' });
  //   }
  // }

  //
  //
  //
  //

  // getSnapshotBeforeUpdate(_, prevState) {
  //   // console.dir(this.imagesRef.current);
  //   if (prevState.photos.length !== this.state.photos.length) {
  //     console.log(window.scrollY);
  //     console.log(this.imagesRef?.current.scrollHeight);

  //     return (
  //       this.imagesRef.current?.scrollHeight +
  //         this.imagesRef.current?.offsetTop ?? null
  //     );
  //   }
  //   return null;
  // }

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
