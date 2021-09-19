import ActionTypes from '../actionTypes';

const initialState = {
  applicationKey: 'function'
};

export const aplication = (state = initialState, action: { type: string, payload: string }): Aplication => {
  switch (action.type) {
    case ActionTypes.SET_CONTENT_KEY: 
      return {
        ...state,
        applicationKey: action.payload
      }
    default: 
      return state;
  }
}

export default aplication
