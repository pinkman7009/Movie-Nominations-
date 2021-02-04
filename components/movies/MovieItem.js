import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import styles from '../../styles/Movie.module.css';
import Alert from '../ui/Alert';
import NomContext from '../../context/nominations/nomContext';

const MovieItem = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');

  const nomContext = useContext(NomContext);

  const { nominations, addNomination } = nomContext;

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${id}`
    );

    const data = await res.json();

    setLoading(false);
    setMovie(data);
  };

  const onButtonClick = () => {
    const newNomination = {
      imdbID: id,
      Title: movie.Title,
      Poster: movie.Poster,
    };
    addNomination(newNomination);
    setDisabledButton(true);
    setAlertMessage(`${movie.Title} has been added to list of nominations!`);

    if (nominations.length === 4) {
      setBannerMessage('Yay! You have added 5 nominations.');
    }
  };

  useEffect(() => {
    if (id !== null) fetchData();

    if (nominations !== null) {
      const ids = nominations.map((nom) => nom.imdbID);

      const bool = ids.includes(id);

      if (bool) setDisabledButton(true);
      else {
        if (nominations.length === 5) {
          setBannerMessage(
            'Looks like you already have 5 nominations. Try un-nominating ( if that is a word ) some movies if you wanna add this one.'
          );
          setDisabledButton(true);
        }
      }
    }
  }, [id]);

  const loaderStyles = css`
    margin: 2rem 0;
  `;
  return loading ? (
    <BeatLoader loading={loading} css={loaderStyles} size={30} />
  ) : movie.Response === 'True' ? (
    <>
      {bannerMessage !== '' && <Alert type='primary' message={bannerMessage} />}
      {alertMessage && <Alert type='primary' message={alertMessage} />}
      <div className={styles.movieItemCard}>
        {movie.Poster !== 'N/A' && (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={500}
            height={500}
          />
        )}
        <div className={styles.movieContent}>
          <h2 className={styles.titleText}>{movie.Title}</h2>
          {movie.Released && movie.Released !== 'N/A' && (
            <div className={styles.movieContentRow}>
              <span className={styles.dark}>Release Date: </span>
              {movie.Released}
            </div>
          )}
          {movie.Genre && movie.Genre !== 'N/A' && (
            <div className={styles.movieContentRow}>
              <span className={styles.dark}>Genre: </span>
              {movie.Genre}
            </div>
          )}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className={styles.movieContentRow}>
              <span className={styles.dark}>Plot: </span>
              {movie.Plot}
            </div>
          )}
          {movie.Director && movie.Director !== 'N/A' && (
            <div className={styles.movieContentRow}>
              <span className={styles.dark}>Directed By: </span>
              {movie.Director}
            </div>
          )}
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className={styles.movieContentRow}>
              <span className={styles.dark}>IMDB Rating: </span>
              {movie.imdbRating}{' '}
            </div>
          )}
          {movie.Type && movie.Type !== 'N/A' && (
            <div className={styles.movieContentRow}>
              <span className={styles.dark}>Type: </span>
              {movie.Type}
            </div>
          )}
          <button
            className={styles.btn}
            disabled={disabledButton}
            onClick={onButtonClick}
          >
            Nominate
          </button>
        </div>
      </div>
      <Link href='/'>
        <button className={styles.btn}>Go Back</button>
      </Link>
    </>
  ) : (
    <>
      <Alert type='danger' message='Oops! No results available' />

      <Link href='/'>
        <button className={styles.btn}>Go Back</button>
      </Link>
    </>
  );
};

export default MovieItem;
