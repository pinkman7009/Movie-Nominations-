import React from 'react';
import { useRouter } from 'next/router';
import MovieItem from '../../components/movies/MovieItem';
import styles from '../../styles/Movie.module.css';

const movie = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <MovieItem id={id} />
    </div>
  );
};

export default movie;
