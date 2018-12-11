import {
  UPDATE_COMPONENT_ORDER,
  UPDATE_CODE_BLOCK,
  ADD_CODE_BLOCK_TAB,
  REMOVE_CODE_BLOCK_TAB,
  UPDATE_PAGE_COMPONENT,
  UPDATE_PAGE_SELECTED,
  SAVE_CHANGES,
  UPDATED_BY,
  UPDATE_COMPONENT_CONTENT
} from '../constants/actionConstants';

export function updatePageSelected(section, page) {
  // select the correct page to edit
  return ({
    type: UPDATE_PAGE_SELECTED,
    payload: {
      section,
      page
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
  // deep pdate codeblock content in real time
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

export function saveNewChanges(page) {
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
