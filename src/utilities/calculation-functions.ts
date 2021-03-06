import { IEdge } from "react-digraph";
import _ from "underscore";
import { IMCNetsRule } from "../type";

export const separatorString = "-copy-of-";
export const indexOfArrayInArray = (
  arrayOfArrays: number[][],
  arrayToFind: number[]
): number => {
  let indexOfArray = -1;
  arrayOfArrays.forEach((array, index) => {
    if (_.isEqual(array, arrayToFind)) {
      indexOfArray = index;
    }
  });
  return indexOfArray;
};

export const generateCoalitions = (arr: Array<number>) =>
  arr
    .reduce(
      (subsets: number[][], value: number) =>
        subsets.concat(subsets.map((set) => [...set, value])),
      [[]]
    )
    .sort((a, b) => a.length - b.length);

export const factorial = (n: number, r: number = 1) => {
  while (n > 0) r *= n--;
  return r;
};
export const randn_bm = (): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
  return num;
};
export const coalitionsGenerateShapleyValue = (
  player: number,
  players: number[],
  coalitions: number[][],
  funcOfCoalitions: number[]
) => {
  let shapleyValue = 0;
  coalitions.forEach((coalition: number[]) => {
    if (coalition.includes(player)) {
      const valueOfCoalitionWithPlayer =
        funcOfCoalitions[indexOfArrayInArray(coalitions, coalition)];
      const coalitionWithoutPlayer = [...coalition];
      coalitionWithoutPlayer.splice(coalition.indexOf(player), 1);
      const valueOfCoalitionWithoutPlayer =
        funcOfCoalitions[
          indexOfArrayInArray(coalitions, coalitionWithoutPlayer)
        ] ?? 0;
      const numberOfPermutationsC = factorial(coalitionWithoutPlayer.length);
      const numberOfPermutationsA = factorial(
        players.length - coalitionWithoutPlayer.length - 1
      );
      const contrCount =
        (numberOfPermutationsA * numberOfPermutationsC) /
        factorial(players.length);
      shapleyValue +=
        (valueOfCoalitionWithPlayer - (valueOfCoalitionWithoutPlayer ?? 0)) *
        contrCount;
    }
  });

  return Number(shapleyValue.toFixed(2));
};

export const calculateAllShapleyValues = (
  players: number[],
  coalitions: number[][],
  funcOfCoalitions: number[]
) => {
  const shapleyValues: number[] = [];
  players.forEach((player: number) => {
    const playerShapleyValue = coalitionsGenerateShapleyValue(
      player,
      players,
      coalitions,
      funcOfCoalitions
    );
    shapleyValues.push(playerShapleyValue);
  });
  return shapleyValues;
};

export const generateCoalitionOfN = (event: number): number[] =>
  Array.from({ length: event }, (v, k) => k + 1);

export const calculatePositivePlayersMarginalContribution = (
  positive: number,
  negative: number,
  value: number
): number => {
  return (
    (value * factorial(positive - 1) * factorial(negative)) /
    factorial(positive + negative)
  );
};
export const calculateNegativePlayersMarginalContribution = (
  positive: number,
  negative: number,
  value: number
): number => {
  return (
    (-1 * value * (factorial(negative - 1) * factorial(positive))) /
    factorial(positive + negative)
  );
};

export const calculateMCNetsShapleyValues = (
  rules: IMCNetsRule[],
  nrOfPlayers: number
) => {
  const values: number[] = Array(nrOfPlayers).fill(0);
  rules.forEach((rule) => {
    const numberOfPositivePlayers = rule.positivePlayers.length;
    const numberOfNegativePlayers = rule.negativePlayers.length;
    const positivePlayersContribution =
      calculatePositivePlayersMarginalContribution(
        numberOfPositivePlayers,
        numberOfNegativePlayers,
        rule.value
      );
    const negativePlayersContribution =
      calculateNegativePlayersMarginalContribution(
        numberOfPositivePlayers,
        numberOfNegativePlayers,
        rule.value
      );

    rule.positivePlayers.forEach((player) => {
      values[parseFloat(player) - 1] += positivePlayersContribution;
    });

    rule.negativePlayers.forEach((player) => {
      values[parseFloat(player) - 1] += negativePlayersContribution;
    });
  });
  return values.map((value) => Number(value.toFixed(2)));
};

export const generateCoalitionsFromEdges = (
  edges: IEdge[]
): Array<{ value: number; coalition: number[] }> => {
  return edges.map((edge) => {
    const source = parseFloat(edge.source.split(separatorString).at(-1) ?? "");
    const target = parseFloat(edge.target.split(separatorString).at(-1) ?? "");
    const value = parseFloat(edge.handleText ?? "");
    return {
      value,
      coalition: source === target ? [source] : [source, target],
    };
  });
};

export const calculateGraphShapleyValues = (
  grandCoalition: number[],
  edges: IEdge[]
): number[] => {
  const edgesStructure = generateCoalitionsFromEdges(edges);
  return grandCoalition.map((player) => {
    let value = 0;
    edgesStructure.forEach((edge) => {
      value += edge.coalition.includes(player)
        ? edge.value / (edge.coalition.length === 2 ? 2 : 1)
        : 0;
    });
    return value;
  });
};

export const generateMCNetsRulesFromEdges = (edges: IEdge[]): IMCNetsRule[] => {
  return edges.map((edge) => {
    const source = edge.source.split(separatorString).at(-1) ?? "";
    const target = edge.target.split(separatorString).at(-1) ?? "";
    const value = parseFloat(edge.handleText ?? "");
    return {
      value,
      positivePlayers: source === target ? [source] : [source, target],
      negativePlayers: [],
    };
  });
};

export const generateCoalitionsCoalitionsFromEdges = (
  edges: IEdge[]
): number[][] => {
  return edges.map((edge) => {
    const source = parseFloat(edge.source.split(separatorString).at(-1) ?? "");
    const target = parseFloat(edge.target.split(separatorString).at(-1) ?? "");
    return source === target ? [source] : [source, target];
  });
};

export const generateFunctionOfCoalitionsFromEdges = (
  coalitions: number[][],
  edges: IEdge[]
) =>
  coalitions.map((coalition) => {
    let value = 0;
    edges?.forEach((edge) => {
      const coalitionContainSourceAndTarget =
        coalition.includes(
          parseFloat(edge.source.elementAfterSplit(separatorString) ?? "0")
        ) &&
        coalition.includes(
          parseFloat(edge.target.elementAfterSplit(separatorString) ?? "0")
        );
      if (coalitionContainSourceAndTarget) {
        value += parseFloat(edge.handleText ?? "0");
      }
    });
    return value;
  });

export const generateFunctionOfCoalitionsFromMCNets = (
  rules: IMCNetsRule[],
  coalitions: number[][]
): number[] => {
  const functionOfCoalitions = Array(coalitions.length).fill(0);
  coalitions.forEach((coalition) => {
    rules.forEach((rule) => {
      if (
        rule.positivePlayers.every((player) =>
          coalition.includes(parseFloat(player))
        ) &&
        !rule.negativePlayers.some((player) =>
          coalition.includes(parseFloat(player))
        )
      ) {
        functionOfCoalitions[indexOfArrayInArray(coalitions, coalition)] +=
          rule.value;
      }
    });
  });
  return functionOfCoalitions;
};
export const generateMCNetsRulesFromCoalitions = (
  coalitions: number[][],
  grandCoalition: number[],
  functionOfCoalitions: number[]
) => {
  const newRules: IMCNetsRule[] = [];
  functionOfCoalitions?.forEach((value, index) => {
    if (value) {
      newRules.push({
        positivePlayers: coalitions?.[index]?.map(String) ?? [],
        negativePlayers:
          grandCoalition
            .filter((player) => !coalitions?.[index]?.includes(player))
            .map(String) ?? [],
        value: value ?? 0,
      });
    }
  });
  return newRules;
};
