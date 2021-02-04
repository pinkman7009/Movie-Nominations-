import React, { useContext } from 'react';
import styles from '../../styles/Movie.module.css';
import Image from 'next/image';
import Link from 'next/link';
import NomContext from '../../context/nominations/nomContext';

const MovieCard = ({ movie, id, unnominate }) => {
  const nomContext = useContext(NomContext);

  const { removeNomination } = nomContext;

  const unNominateHandler = () => {
    removeNomination(id);
  };
  return (
    <div className={styles.card}>
      <h3 className={styles.titleText}>{movie.Title}</h3>
      {movie.Poster !== 'N/A' ? (
        <Image src={movie.Poster} alt={movie.Title} width={500} height={500} />
      ) : (
        <h2>N/A</h2>
      )}
      <Link href='/movies/[id]' as={`/movies/${id}`}>
        <button className={styles.btn}>View More</button>
      </Link>
      {unnominate === true && (
        <button className={styles.btn} onClick={unNominateHandler}>
          Un-Nominate
        </button>
      )}
    </div>
  );
};

export default MovieCard;
