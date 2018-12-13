import _ from 'lodash';
import {
  UPDATE_COMPONENT_ORDER,
  UPDATE_CODE_BLOCK,
  ADD_CODE_BLOCK_TAB,
  REMOVE_CODE_BLOCK_TAB,
  UPDATE_PAGE_COMPONENT,
  UPDATE_PAGE_SELECTED,
  SAVE_CHANGES,
  UPDATED_BY,
  EDITS_MADE,
  ADD_COMPONENT,
  DELETE_COMPONENT,
  SWITCH_COMPONENTS,
  UPDATE_COMPONENT_CONTENT
} from '../constants/actionConstants';

export function isEdited(boolean) {
  // set to true if changes were made
  return ({
    type: EDITS_MADE,
    payload: boolean
  });
}

export function addComponent(component) {
  // add codeblock or markdown component to page
  return ({
    type: ADD_COMPONENT,
    payload: component
  });
}

export function deleteComponent(index) {
  // delete component from page
  return ({
    type: DELETE_COMPONENT,
    payload: index
  });
}

export function switchComponents(firstIdx, secondIdx) {
  return ({
    type: SWITCH_COMPONENTS,
    payload: {
      firstIdx,
      secondIdx
    }
  });
}

export function updatePageSelected(section, page, index, hIndex) {
  let firstComponent;
  let updatedPage;
  // select the correct page to edit
  if (page.components.length > 0) {
    firstComponent = page.components[0];
    firstComponent.index = 0;
    updatedPage = page;
  } else {
    firstComponent = {
      type: 'MARKDOWN',
      index: 0,
      content: `# ${page.title}`
    };
    updatedPage = _.cloneDeep(page);
    updatedPage.components.push(firstComponent);
  }
  return ({
    type: UPDATE_PAGE_SELECTED,
    payload: {
      section,
      page: updatedPage,
      index,
      firstComponent,
      hIndex
    }
  });
}

export function updateComponentOrder(components) {
  // update order in which components are rendered
  return ({
    type: UPDATE_COMPONENT_ORDER,
    payload: components
  });
}

export function updatePageComponent(component, updatedBy) {
  // update component to edit
  return ({
    type: UPDATE_PAGE_COMPONENT,
    payload: {
      component,
      updatedBy
    }
  });
}

export function updateComponentContent(content, updatedBy) {
  // update component content in real time
  return ({
    type: UPDATE_COMPONENT_CONTENT,
    payload: {
      content,
      updatedBy
    }
  });
}

export function updateCodeBlock(content, updatedBy, type, index) {
  // deep update codeblock content in real time
  return ({
    type: UPDATE_CODE_BLOCK,
    payload: {
      content,
      updatedBy,
      type,
      index
    }
  });
}

export function addCodeBlockTab(tab, updatedBy) {
  // deep pdate codeblock content in real time
  return ({
    type: ADD_CODE_BLOCK_TAB,
    payload: {
      tab,
      updatedBy
    }
  });
}

export function removeCodeBlockTab(index, updatedBy) {
  // deep pdate codeblock content in real time
  return ({
    type: REMOVE_CODE_BLOCK_TAB,
    payload: {
      index,
      updatedBy
    }
  });
}

export function saveChanges(page) {
  // save changes to main list
  return ({
    type: SAVE_CHANGES,
    payload: page
  });
}

// export function updatedBy(type) {
//   // save changes to main list
//   return ({
//     type: UPDATED_BY,
//     payload: type
//   });
// }
