import ActionTypes from './actionTypes';

export const setCoalitionsNumberOfplayers = (nrOfPlayes: number) : {
  type: string,
  payload: number
} => ({
  type: ActionTypes.SET_COALITIONS_NUMBER_OF_PLAYERS,
  payload: nrOfPlayes
});

export const setCoalitionsGameDefinition = (gameDefinition: CoalitionsGameDefinition) : {
  type: string,
  payload: CoalitionsGameDefinition
} => ({
  type: ActionTypes.SET_COALITIONS_GAME_DEFINITION,
  payload: gameDefinition
});

export const setCoalitionsShapleyValues = (shapleyValues: number[]) : {
  type: string,
  payload: number[]
} => ({
  type: ActionTypes.SET_COALITIONS_GAME_DEFINITION,
  payload: shapleyValues
});
