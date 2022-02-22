import ActionTypes from '../actionTypes';

const initialState: Store = {};

export const aplication = (state = initialState, action: { type: any; payload: any; }): Store => {
  switch (action.type) {
    case ActionTypes.SET_COALITIONS_NUMBER_OF_PLAYERS: 
      return {
        ...state,
        coalitions: {
          ...state.coalitions,
          nrOfPlayes: action.payload
        }
      }
    case ActionTypes.SET_COALITIONS_GAME_DEFINITION: 
      return {
        ...state,
        coalitions: {
          ...state.coalitions,
          gameDefinition: action.payload
        }
      }
      case ActionTypes.SET_COALITIONS_SHAPLEY_VALUES: 
        return {
          ...state,
          coalitions: {
            ...state.coalitions,
            shapleyValues: action.payload
          }
        }
    default: 
      return state;
  }
}

export default aplication
