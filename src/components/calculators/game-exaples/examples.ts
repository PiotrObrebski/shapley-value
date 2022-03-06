import {
  generateCoalitionOfN,
  generateCoalitions,
  generateMCNetsRulesFromCoalitions,
  randn_bm,
  separatorString,
} from "../../../utilities/calculation-functions";
import { PLAYER_TYPE } from "../calculator-graph/config";

export const coalitionsExamples = (nrOfPlayers: number, k: number) => {
  const grandCoalition = generateCoalitionOfN(nrOfPlayers);
  const coalitions = generateCoalitions(grandCoalition);
  return [
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map((coalition) => k * coalition.length),
    },
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map(
        (coalition) => coalition.length ** k
      ),
    },
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map(
        (coalition) => k * Math.max(...coalition)
      ),
    },
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map(
        (coalition) => k * Math.min(...coalition)
      ),
    },
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map(
        (coalition: number[]) =>
          k *
          parseFloat(
            (function (arr) {
              return arr.reduce((a, b) => a + b, 0) / arr.length;
            })(coalition).toFixed(2)
          )
      ),
    },
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map((coalition: number[]) =>
        parseFloat((k * coalition.length * Math.random()).toFixed(2))
      ),
    },
    {
      nrOfPlayers,
      coalitions,
      functionOfCoalitions: coalitions.map((coalition: number[]) =>
        parseFloat((k * coalition.length * randn_bm()).toFixed(2))
      ),
    },
  ];
};

export const mcNetsExamples = (nrOfPlayers: number, k: number) => {
  const instanceCoalitionsExamples = coalitionsExamples(nrOfPlayers, k);
  return instanceCoalitionsExamples.map((coalitionExample) => ({
    nrOfPlayers,
    rules: generateMCNetsRulesFromCoalitions(
      coalitionExample.coalitions,
      generateCoalitionOfN(nrOfPlayers),
      coalitionExample.functionOfCoalitions
    ),
  }));
};
const generateXCoordinateOfCircle = (
  nrOfPlayers: number,
  player: number,
  copy?: boolean
): number => {
  const angle = (2 * Math.PI * player) / nrOfPlayers;

  return Math.cos(angle) * (copy ? 400 : 300);
};
const generateYCoordinateOfCircle = (
  nrOfPlayers: number,
  player: number,
  copy?: boolean
): number => {
  const angle = (2 * Math.PI * player) / nrOfPlayers;
  return Math.sin(angle) * (copy ? 400 : 300);
};
export const graphExamples = (nrOfPlayers: number, k: number) => {
  const grandCoalition = generateCoalitionOfN(nrOfPlayers);
  return [
    {
      nrOfPlayers,
      nodes: grandCoalition.flatMap((player) => [
        {
          id: player.toString(),
          title: player.toString(),
          type: PLAYER_TYPE,
          x: generateXCoordinateOfCircle(nrOfPlayers, player),
          y: generateYCoordinateOfCircle(nrOfPlayers, player),
        },
        {
          id: `${(nrOfPlayers ?? 0) + 1}${separatorString}${player}`,
          title: `${"copied "}${player}`,
          type: PLAYER_TYPE,
          x: generateXCoordinateOfCircle(nrOfPlayers, player, true),
          y: generateYCoordinateOfCircle(nrOfPlayers, player, true),
        },
      ]),
      edges:
        grandCoalition.map((player) => ({
          handleText: k.toString(),
          source: player.toString(),
          target: `${(nrOfPlayers ?? 0) + 1}${separatorString}${player}`,
          type: "normalEdge",
        })) ?? [],
    },
  ];
};
