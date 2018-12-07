import {
  UPDATE_COMPONENT_ORDER,
  UPDATE_PAGE_COMPONENT,
  UPDATE_PAGE_SELECTED,
  SAVE_CHANGES,
  UPDATE_NAV,
  UPDATE_PAGES,
  UPDATE_COMPONENT_CONTENT
} from '../constants/actionConstants';
import navigation from '../data/mainList';

const initialState = {
  navigation,
  selectedPage: navigation[1].pages[0], // select "API Initialization" for now
  selectedHeader: navigation[1].header,
  selectedComponent: {
    type: 'MARKDOWN',
    index: 3,
    content: '## something'
  },
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
    case UPDATE_PAGE_COMPONENT:
      return {
        ...state,
        selectedComponent: action.payload
      };
    case UPDATE_COMPONENT_CONTENT:
      return {
        ...state,
        selectedComponent: {
          ...state.selectedComponent,
          content: action.payload
        }
      };
    default:
      return state;
  }
};
