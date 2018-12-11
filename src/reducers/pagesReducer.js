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
  UPDATE_COMPONENT_CONTENT,
  EDITS_MADE,
  ADD_COMPONENT,
  DELETE_COMPONENT,
  SWITCH_COMPONENTS
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
  let results;
  let first;
  switch (action.type) {
    case EDITS_MADE:
      return {
        ...state,
        editsMade: action.payload
      };
    case SAVE_CHANGES:
      return {
        ...state,
        // TODO: UPDATE MAIN LIST
      };
    case UPDATE_NAV:
      return {
        ...state,
        navigation: []
      };
    case UPDATE_PAGE_SELECTED:
      return {
        ...state,
        selectedPage: action.payload.page
      };
    case UPDATE_PAGES:
      // placeholder
      return {
        ...state,
        pages: []
      };
    case ADD_COMPONENT:
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          components: [
            ...state.selectedPage.components,
            action.payload
          ]
        }
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          components: [
            ...state.selectedPage.components.slice(0, action.payload),
            ...state.selectedPage.components.slice(action.payload + 1)
          ]
        }
      };
    case SWITCH_COMPONENTS:
      results = state.selectedPage.components.slice();
      first = state.selectedPage.components[action.payload.firstIdx];
      results[action.payload.firstIdx] = state.selectedPage.components[action.payload.secondIdx];
      results[action.payload.secondIdx] = first;
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          components: results
        }
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
        lastUpdatedBy: action.payload.updatedBy,
        selectedPage: {
          ...state.selectedPage,
          components: [
            ...state.selectedPage.components.slice(0, state.selectedComponent.index),
            {
              content: action.payload.content,
              index: state.selectedComponent.index,
              type: 'MARKDOWN'
            },
            ...state.selectedPage.components.slice(state.selectedComponent.index + 1)
          ]
        }
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
        lastUpdatedBy: action.payload.updatedBy,
        selectedPage: {
          ...state.selectedPage,
          components: [
            ...state.selectedPage.components.slice(0, state.selectedComponent.index),
            {
              content: [
                ...state.selectedPage.components[state.selectedComponent.index].content.slice(0, action.payload.index),
                {
                  ...state.selectedPage.components[state.selectedComponent.index].content[action.payload.index],
                  [action.payload.type]: action.payload.content
                },
                ...state.selectedPage.components[state.selectedComponent.index].content.slice(action.payload.index + 1)
              ],
              index: state.selectedComponent.index,
              type: 'CODEBLOCK'
            },
            ...state.selectedPage.components.slice(state.selectedComponent.index + 1)
          ]
        }
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
        lastUpdatedBy: action.payload.updatedBy,
        selectedPage: {
          ...state.selectedPage,
          components: [
            ...state.selectedPage.components[state.selectedComponent.index].content.slice(0, action.payload.index),
            ...state.selectedPage.components[state.selectedComponent.index].content.slice(action.payload.index + 1)
          ]
        }
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
        lastUpdatedBy: action.payload.updatedBy,
        selectedPage: {
          ...state.selectedPage,
          components: [
            ...state.selectedPage.components.slice(0, state.selectedComponent.index),
            {
              content: [
                ...state.selectedPage.components[state.selectedComponent.index].content,
                action.payload.tab
              ],
              index: state.selectedComponent.index,
              type: 'CODEBLOCK'
            }
          ]
        }
      };
    default:
      return state;
  }
};
