import {
  UPDATE_COMPONENT_ORDER,
  UPDATE_PAGE_COMPONENT,
  UPDATE_PAGE_SELECTED,
  SAVE_CHANGES,
  UPDATE_NAV,
  UPDATE_CODE_BLOCK,
  ADD_CODE_BLOCK_TAB,
  REMOVE_CODE_BLOCK_TAB,
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
    content: '# Start typing markdown here'
  },
  lastUpdatedBy: null, // 'EDITOR' or 'PREVIEW'
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
        selectedComponent: action.payload.component,
        lastUpdatedBy: action.payload.updatedBy
      };
    case UPDATE_COMPONENT_CONTENT:
      return {
        ...state,
        selectedComponent: {
          ...state.selectedComponent,
          content: action.payload.content
        },
        lastUpdatedBy: action.payload.updatedBy
      };
    case UPDATE_CODE_BLOCK:
      return {
        ...state,
        selectedComponent: {
          ...state.selectedComponent,
          content: [
            ...state.selectedComponent.content.slice(0, action.payload.index),
            {
              ...state.selectedComponent.content[action.payload.index],
              [action.payload.type]: action.payload.content
            },
            ...state.selectedComponent.content.slice(action.payload.index + 1)
          ]
        },
        lastUpdatedBy: action.payload.updatedBy
      };
    case REMOVE_CODE_BLOCK_TAB:
      return {
        ...state,
        selectedComponent: {
          ...state.selectedComponent,
          content: [
            ...state.selectedComponent.content.slice(0, action.payload.index),
            ...state.selectedComponent.content.slice(action.payload.index + 1)
          ]
        },
        lastUpdatedBy: action.payload.updatedBy
      };
    case ADD_CODE_BLOCK_TAB:
      return {
        ...state,
        selectedComponent: {
          ...state.selectedComponent,
          content: [
            ...state.selectedComponent.content,
            action.payload.tab
          ]
        },
        lastUpdatedBy: action.payload.updatedBy
      };
    default:
      return state;
  }
};
