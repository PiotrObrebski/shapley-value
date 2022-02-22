import ActionTypes from "./actionTypes";

export const setCoalitionsNumberOfplayers = (
  nrOfPlayes: number
): {
  type: string;
  payload: number;
} => ({
  type: ActionTypes.SET_COALITIONS_NUMBER_OF_PLAYERS,
  payload: nrOfPlayes,
});

export const setCoalitionsCoalitions = (
  coalitions: number[][]
): {
  type: string;
  payload: number[][];
} => ({
  type: ActionTypes.SET_COALITIONS_COALITIONS,
  payload: coalitions,
});

export const setCoalitionsFunctionOfCoalitions = (
  functionOfCoalitions: number[]
): {
  type: string;
  payload: number[];
} => ({
  type: ActionTypes.SET_COALITIONS_FUNCTION_OF_COALITIONS,
  payload: functionOfCoalitions,
});

export const setCoalitionsShapleyValues = (
  shapleyValues: number[]
): {
  type: string;
  payload: number[];
} => ({
  type: ActionTypes.SET_COALITIONS_SHAPLEY_VALUES,
  payload: shapleyValues,
});
