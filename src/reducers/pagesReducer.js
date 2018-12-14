import _ from 'lodash';
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
  ADD_COMPONENT,
  DELETE_COMPONENT,
  DELETE_PAGE,
  UPDATE_PAGE_TITLE,
  SWITCH_COMPONENTS,
  CREATE_SECTION,
  CREATE_PAGE
} from '../constants/actionConstants';
import navigation from '../data/mainList';

const initialState = {
  navigation,
  selectedPage: navigation[1].pages[0], // select "API Initialization" for now
  selectedHeaderIndex: 1,
  selectedPageIndex: 0,
  selectedHeader: navigation[1].header,
  selectedComponent: {
    type: 'MARKDOWN',
    index: 3,
    content: '# Type some markdown'
  },
  lastUpdatedBy: null, // 'EDITOR' or 'PREVIEW'
  pages: []
};

export default (state = initialState, action) => {
  let results;
  let first;
  let firstComponent;
  let newNav;
  let newPageSelected;
  switch (action.type) {
    case SAVE_CHANGES:
      return {
        ...state,
        navigation: [
          ...state.navigation.slice(0, state.selectedHeaderIndex),
          {
            header: state.selectedHeader.header,
            pages: [
              ...state.navigation[state.selectedHeaderIndex].pages.slice(0, state.selectedPageIndex),
              action.payload,
              ...state.navigation[state.selectedHeaderIndex].pages.slice(state.selectedPageIndex + 1)
            ]
          },
          ...state.navigation.slice(state.selectedHeaderIndex + 1)
        ],
        editsMade: false
      };
    case UPDATE_PAGE_TITLE:
      newNav = _.cloneDeep(state.navigation);
      newNav[state.selectedHeaderIndex].pages[state.selectedPageIndex].title = action.payload;
      newPageSelected = newNav[state.selectedHeaderIndex].pages[state.selectedPageIndex];
      return {
        ...state,
        navigation: newNav,
        pageSelected: newPageSelected
      };
    case UPDATE_PAGE_SELECTED:
      return {
        ...state,
        selectedPage: action.payload.page,
        selectedHeader: action.payload.section,
        selectedPageIndex: action.payload.index,
        selectedComponent: action.payload.firstComponent,
        lastUpdatedBy: 'ELSEWHERE', // not updated by the editor or the preview component
        selectedHeaderIndex: action.payload.hIndex,
        editsMade: false // new page selection, so no edits were made
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
        },
        editsMade: true
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
        },
        editsMade: true
      };
    case SWITCH_COMPONENTS:
      results = _.cloneDeep(state.selectedPage.components);
      first = state.selectedPage.components[action.payload.firstIdx];
      results[action.payload.firstIdx] = state.selectedPage.components[action.payload.secondIdx];
      results[action.payload.secondIdx] = first;
      return {
        ...state,
        selectedPage: {
          ...state.selectedPage,
          components: results
        },
        editsMade: true
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
        },
        editsMade: true
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
        },
        editsMade: true
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
            ...state.selectedPage.components.slice(0, state.selectedComponent.index),
            {
              content: [
                ...state.selectedPage.components[state.selectedComponent.index].content.slice(0, action.payload.index),
                ...state.selectedPage.components[state.selectedComponent.index].content.slice(action.payload.index + 1)
              ],
              index: state.selectedComponent.index,
              type: 'CODEBLOCK'
            },
            ...state.selectedPage.components.slice(state.selectedComponent.index + 1)
          ]
        },
        editsMade: true
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
        },
        editsMade: true
      };
    case CREATE_SECTION:
      newNav = _.cloneDeep(state.navigation);
      newNav.push(action.payload.section);
      return {
        ...state,
        navigation: newNav,
        selectedPage: action.payload.page
      };
    case CREATE_PAGE:
      newNav = _.cloneDeep(state.navigation); // creating deep copy of navigation in state
      for (let i = 0; i < newNav.length; i += 1) { // modifying copy
        if (newNav[i].header === action.payload.section.header) {
          newNav[i].pages.push(action.payload.page);
          return {
            ...state,
            navigation: newNav // return copy
          };
        }
      }
      break;
    case DELETE_PAGE:
      newNav = _.cloneDeep(state.navigation);
      newNav[state.selectedHeaderIndex].pages.splice(state.selectedPageIndex, 1);
      for (let i = 0; i < newNav.length; i++) {
        if (newNav[i].pages.length > 0) {
          newPageSelected = newNav[i].pages[0];
          if (newNav[i].pages[0].components.length > 0) {
            firstComponent = newNav[i].pages[0].components[0];
            firstComponent.index = 0;
          } else {
            firstComponent = {
              type: 'MARKDOWN',
              index: 0,
              content: `# ${newNav[i].pages[0].title}`
            };
            newPageSelected.components.push(firstComponent);
          }
          return {
            ...state,
            navigation: newNav,
            selectedPage: newPageSelected,
            selectedComponent: firstComponent,
            lastUpdatedBy: 'ELSEWHERE'
          };
        }
      }
      break;
    default:
      return state;
  }
};
