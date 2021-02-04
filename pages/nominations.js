import React, { useState, useEffect, useContext } from 'react';
import MovieList from '../components/movies/MovieList';
import Alert from '../components/ui/Alert';
import styles from '../styles/Home.module.css';
import NomContext from '../context/nominations/nomContext';

const nominations = () => {
  const nomContext = useContext(NomContext);
  const [loading, setLoading] = useState(true);

  const { nominations, getNominations } = nomContext;

  useEffect(() => {
    getNominations();
    setLoading(false);
  }, []);

  if (nominations === null || nominations.length === 0) {
    return (
      <div className={styles.container}>
        <Alert type='danger' message='No Nominations! Please add one.' />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Nominations</h2>
      <h3>Nominations Left : {5 - nominations.length}</h3>
      {nominations !== null && (
        <MovieList movies={nominations} loading={loading} unnominate={true} />
      )}
    </div>
  );
};

export default nominations;
