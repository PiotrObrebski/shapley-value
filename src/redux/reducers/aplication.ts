import { PLAYER_TYPE } from "../../components/calculators/calculator-graph/config";
import { Store } from "../../type";
import ActionTypes from "../actionTypes";

const initialState: Store = {
  graph: {
    nrOfPlayers: 1,
    nodes: [
      {
        id: "1",
        title: "1",
        type: PLAYER_TYPE,
        x: 300,
        y: 300,
      },
    ],
  },
};

export const aplication = (
  state = initialState,
  action: { type: any; payload: any }
): Store => {
  switch (action.type) {
    case ActionTypes.SET_COALITIONS_NUMBER_OF_PLAYERS:
      return {
        ...state,
        coalitions: {
          ...state.coalitions,
          nrOfPlayes: action.payload,
        },
      };
    case ActionTypes.SET_COALITIONS_COALITIONS:
      return {
        ...state,
        coalitions: {
          ...state.coalitions,
          coalitions: action.payload,
        },
      };
    case ActionTypes.SET_COALITIONS_FUNCTION_OF_COALITIONS:
      return {
        ...state,
        coalitions: {
          ...state.coalitions,
          functionOfCoalitions: action.payload,
        },
      };
    case ActionTypes.SET_COALITIONS_SHAPLEY_VALUES:
      return {
        ...state,
        coalitions: {
          ...state.coalitions,
          shapleyValues: action.payload,
        },
      };
    case ActionTypes.SET_MCNETS_NUMBER_OF_PLAYERS:
      return {
        ...state,
        mcNets: {
          ...state.mcNets,
          nrOfPlayes: action.payload,
        },
      };
    case ActionTypes.SET_MCNETS_RULES:
      return {
        ...state,
        mcNets: {
          ...state.mcNets,
          rules: action.payload,
        },
      };
    case ActionTypes.SET_MCNETS_SHAPLEY_VALUES:
      return {
        ...state,
        mcNets: {
          ...state.mcNets,
          shapleyValues: action.payload,
        },
      };
    case ActionTypes.SET_GRAPH_NUMBER_OF_PLAYERS:
      return {
        ...state,
        graph: {
          ...state.graph,
          nrOfPlayers: action.payload,
        },
      };
    case ActionTypes.SET_GRAPH_EDGES:
      return {
        ...state,
        graph: {
          ...state.graph,
          edges: action.payload,
        },
      };
    case ActionTypes.SET_GRAPH_NODES:
      return {
        ...state,
        graph: {
          ...state.graph,
          nodes: action.payload,
        },
      };
    case ActionTypes.SET_GRAPH_SHAPLEY_VALUES:
      return {
        ...state,
        graph: {
          ...state.graph,
          shapleyValues: action.payload,
        },
      };
    default:
      return state;
  }
};

export default aplication;
