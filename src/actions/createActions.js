import {
  CREATE_SECTION,
  CREATE_PAGE,
} from '../constants/actionConstants';

export function createSection(payload) {
  return ({
    type: CREATE_SECTION,
    payload
  });
}

export function createPage(section, page) {
  return ({
    type: CREATE_PAGE,
    payload: {
      section,
      page
    }
  });
}
