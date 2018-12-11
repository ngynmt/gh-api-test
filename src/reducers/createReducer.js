import {
  CREATE_SECTION,
  CREATE_PAGE
} from '../constants/actionConstants';
import navigation from '../data/mainList';

const initialState = {
  navigation,
  selectedPage: null,
  selectedHeader: null,

};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SECTION:
      navigation.push(action.payload.section);
      return {
        ...state,
        navigation,
        selectedPage: action.payload.page
      };
    case CREATE_PAGE:
      for (let i = 0; i < state.navigation.length; i += 1) {
        if (state.navigation[i].header === action.payload.section.header) {
          state.navigation[i].pages.push(action.payload.page);
          break;
        }
      }
      return {
        ...state,
        selectedPage: action.payload.page
      };
    default:
      return state;
  }
};
