import React, { useReducer } from 'react';
import NomContext from './nomContext';
import nomReducer from './nomReducer';
import { ADD_NOM, GET_NOMS, REMOVE_NOM } from './constants';
import Cookie from 'js-cookie';

const NomState = (props) => {
  const initialState = {
    nominations: [],
  };

  const [state, dispatch] = useReducer(nomReducer, initialState);

  // Get Nominations

  const getNominations = () => {
    const nominationsFromCookies = Cookie.get('nominations')
      ? Cookie.getJSON('nominations')
      : [];

    dispatch({
      type: GET_NOMS,
      payload: nominationsFromCookies,
    });
  };

  // Add Nomination

  const addNomination = (newNomination) => {
    dispatch({
      type: ADD_NOM,
      payload: newNomination,
    });
  };

  // Remove Nomination

  const removeNomination = (id) => {
    dispatch({
      type: REMOVE_NOM,
      payload: id,
    });
  };

  return (
    <NomContext.Provider
      value={{
        nominations: state.nominations,
        getNominations,
        addNomination,
        removeNomination,
      }}
    >
      {props.children}
    </NomContext.Provider>
  );
};

export default NomState;
