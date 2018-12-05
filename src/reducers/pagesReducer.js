import { UPDATE_NAV, UPDATE_PAGES } from '../constants/actionConstants';
import navigation from '../data/mainList';

const initialState = {
  navigation,
  pages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAV:
      return {
        ...state,
        navigation: []
      };
    case UPDATE_PAGES:
      // placeholder
      return {
        ...state,
        pages: []
      };
    default:
      return state;
  }
};
