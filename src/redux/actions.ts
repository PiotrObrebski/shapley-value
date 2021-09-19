import ActionTypes from './actionTypes';

export const setContentKey = (content: string) : {
  type: string,
  payload: string
} => ({
  type: ActionTypes.SET_CONTENT_KEY,
  payload: content
});
