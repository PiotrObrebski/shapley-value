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

export const setMCNetsNumberOfPlayers = (
  nrOfPlayes: number
): {
  type: string;
  payload: number;
} => {
  return {
    type: ActionTypes.SET_MCNETS_NUMBER_OF_PLAYERS,
    payload: nrOfPlayes,
  };
};

export const setMCNetsRules = (
  rules: IMCNetsRule[]
): {
  type: string;
  payload: IMCNetsRule[];
} => ({
  type: ActionTypes.SET_MCNETS_RULES,
  payload: rules,
});

export const setMCNetsShapleyValues = (
  shapleyValues: number[]
): {
  type: string;
  payload: number[];
} => ({
  type: ActionTypes.SET_MCNETS_SHAPLEY_VALUES,
  payload: shapleyValues,
});
