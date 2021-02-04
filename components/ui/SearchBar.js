import React from 'react';
import styles from '../../styles/SearchBar.module.css';
const SearchBar = ({ handleChange }) => {
  return (
    <>
      <input
        type='text'
        placeholder='search movies'
        className={styles.searchBar}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;
