import _ from "underscore";

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
