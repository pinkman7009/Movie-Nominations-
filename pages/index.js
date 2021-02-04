import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import SearchBar from '../components/ui/SearchBar';
import MovieList from '../components/movies/MovieList';
import { server } from '../config/index';
import useDebounce from '../lib/useDebounce';

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchVal, 500);

  const fetchMovies = async () => {
    setLoading(true);
    const res = await fetch(`${server}/api/movies/${debouncedSearch}`);

    const data = await res.json();
    setMovies(data.movies);
    setLoading(false);
    // console.log(movies);
  };

  useEffect(() => {
    if (debouncedSearch !== '') {
      fetchMovies();
    }
  }, [debouncedSearch]);

  const handleChange = (e) => {
    const text = e.target.value.split(' ').join('+');
    setSearchVal(text);
  };

  return (
    <>
      <div className={styles.container}>
        <SearchBar handleChange={handleChange} />
        {movies && movies.Response === 'True' && (
          <MovieList
            movies={movies.Search}
            loading={loading}
            unnominate={false}
          />
        )}
      </div>
    </>
  );
}
