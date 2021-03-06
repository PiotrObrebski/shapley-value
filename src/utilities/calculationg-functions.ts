import _ from "underscore";
import { IMCNetsRule } from "../type";

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

export const generateCoalitions = (inp: Array<number>) => {
  const length = inp.length;
  const allCoalitions = [];

  for (let i = 0; i < Math.pow(2, length); i++) {
    const subset = [];

    for (var j = 0; j < length; j++) {
      if (i & (1 << j)) {
        subset.push(inp[j]);
      }
    }
    allCoalitions.push(subset);
  }

  return allCoalitions;
};

export const factorial = (n: number, r: number = 1) => {
  while (n > 0) r *= n--;
  return r;
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
        ];
      const numberOfPermutationsC = factorial(coalitionWithoutPlayer.length);
      const numberOfPermutationsA = factorial(
        players.length - coalitionWithoutPlayer.length - 1
      );
      const contrCount =
        (numberOfPermutationsA * numberOfPermutationsC) /
        factorial(players.length);
      shapleyValue +=
        (valueOfCoalitionWithPlayer - valueOfCoalitionWithoutPlayer) *
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

export const generateCoalitionOfN = (event: number) =>
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
        numberOfNegativePlayers,
        numberOfPositivePlayers,
        rule.value
      );

    rule.positivePlayers.forEach((player) => {
      values[parseFloat(player) - 1] += positivePlayersContribution;
    });

    rule.negativePlayers.forEach((player) => {
      values[parseFloat(player) - 1] += negativePlayersContribution;
    });
  });
  return values;
};
export const firstMissingPositive = (nums: number[]) => {
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    if (nums[i] < 0) nums[i] = 0;
  }

  for (let i = 0; i < len; i++) {
    let pos = Math.abs(nums[i]) - 1;
    if (pos >= 0 && pos <= len) {
      if (nums[pos] > 0) nums[pos] = -nums[pos];
      if (nums[pos] === 0) nums[pos] = -Infinity;
    }
  }

  for (let i = 0; i < len; i++) {
    if (nums[i] >= 0) return i + 1;
  }

  return len + 1;
};
