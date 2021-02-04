import { ADD_NOM, GET_NOMS, REMOVE_NOM } from './constants';
import Cookie from 'js-cookie';

const nomReducer = (state, action) => {
  switch (action.type) {
    case GET_NOMS:
      return {
        ...state,
        nominations: action.payload,
        numberOfNominatons: action.payload.length,
      };
    case ADD_NOM:
      const total = [action.payload, ...state.nominations];
      Cookie.set('nominations', JSON.stringify(total));

      return {
        ...state,
        nominations: total,
        numberOfNominatons: total.length,
      };
    case REMOVE_NOM:
      const filtered = state.nominations.filter(
        (nom) => nom.imdbID !== action.payload
      );
      Cookie.set('nominations', JSON.stringify(filtered));

      return {
        ...state,
        nominations: filtered,
        numberOfNominatons: filtered.length,
      };
    default:
      return state;
  }
};

export default nomReducer;
