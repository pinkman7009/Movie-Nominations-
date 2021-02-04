import { ADD_NOM, GET_NOMS, REMOVE_NOM } from './constants';
import Cookie from 'js-cookie';

const nomReducer = (state, action) => {
  switch (action.type) {
    case GET_NOMS:
      // console.log(action.payload.length);
      return {
        ...state,
        nominations: action.payload,
      };
    case ADD_NOM:
      const total = [action.payload, ...state.nominations];
      Cookie.set('nominations', JSON.stringify(total), { expires: 100 });

      return {
        ...state,
        nominations: total,
      };
    case REMOVE_NOM:
      const filtered = state.nominations.filter(
        (nom) => nom.imdbID !== action.payload
      );
      Cookie.set('nominations', JSON.stringify(filtered), { expires: 100 });

      return {
        ...state,
        nominations: filtered,
      };
    default:
      return state;
  }
};

export default nomReducer;
