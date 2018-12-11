import {
  CREATE_SECTION,
  CREATE_PAGE,
} from '../constants/actionConstants';

export function createSection(section, page) {
  return ({
    type: CREATE_SECTION,
    payload: {
      section,
      page
    }
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
