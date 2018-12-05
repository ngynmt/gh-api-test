const url = process.env.NODE_ENV === 'qa' ? '/qa/docs_editor' : '/docs_editor';

export const MAIN_LINK = `${url}`;
export const AUTH_LINK = `${url}/authenticate`;
export const EDIT_LINK = `${url}/edit`;
export const REVIEW_LINK = `${url}/review`;
export const SUCCESS_LINK = `${url}/success`;
