import { PLAYER_TYPE } from "../calculator-graph/config";

export const coalitionsExamples = [
  {
    nrOfPlayers: 1,
    coalitions: [[], [1]],
    functionOfCoalitions: [0, 1],
  },
];

export const mcNetsExamples = [
  {
    nrOfPlayers: 1,
    rules: [{ value: 1, positivePlayers: ["1"], negativePlayers: [] }],
  },
];
export const graphExamples = [
  {
    nrOfPlayers: 2,
    nodes: [
      {
        id: "1",
        title: "1",
        type: PLAYER_TYPE,
        x: 300,
        y: 300,
      },
      {
        id: "2",
        title: "2",
        type: PLAYER_TYPE,
        x: 600,
        y: 300,
      },
    ],
    edges: [
      {
        handleText: "0",
        source: "1",
        target: "2",
        type: "normalEdge",
      },
    ],
  },
];
