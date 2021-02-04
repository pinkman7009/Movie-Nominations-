import React from 'react';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

import styles from '../../styles/Movie.module.css';
import MovieCard from './MovieCard';

const MovieList = ({ movies, loading, unnominate }) => {
  const loaderStyles = css`
    margin: 2rem 0;
  `;
  return loading ? (
    <BeatLoader loading={loading} css={loaderStyles} size={30} />
  ) : (
    <div className={styles.movielist}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          id={movie.imdbID}
          unnominate={unnominate}
        />
      ))}
    </div>
  );
};

export default MovieList;
