import {
  UPDATE_COMPONENT_ORDER,
  UPDATE_PAGE_COMPONENT,
  UPDATE_PAGE_SELECTED,
  SAVE_CHANGES,
  UPDATE_COMPONENT_CONTENT
} from '../constants/actionConstants';

export function updatePageSelected(page) {
  // select the correct page to edit
  return ({
    type: UPDATE_PAGE_SELECTED,
    payload: page
  });
}

export function updateComponentOrder(components) {
  // update order in which components are rendered
  return ({
    type: UPDATE_COMPONENT_ORDER,
    payload: components
  });
}

export function updatePageComponent(content) {
  // update component content in real time
  return ({
    type: UPDATE_PAGE_COMPONENT,
    payload: content
  });
}

export function updateComponentContent(content) {
  // update component content in real time
  return ({
    type: UPDATE_COMPONENT_CONTENT,
    payload: content
  });
}

export function saveNewChanges(page) {
  // save changes to main list
  return ({
    type: SAVE_CHANGES,
    payload: page
  });
}
