import _ from "underscore"

export const indexOfArrayInArray = (arrayOfArrays: number[][], arrayToFind: number[]): number => {
  let indexOfArray = -1
  arrayOfArrays.forEach((array, index) => {
    if (_.isEqual(array, arrayToFind)) {
      indexOfArray = index
    }
  })
  return indexOfArray
}

export const generateCoalitions = (inp: Array<number>) => {
  const length = inp.length;
  const allCoalitions = [];

  for (let i = 0; i < (Math.pow(2, length)); i++) {
    const subset = [];

    for (var j = 0; j < length; j++) {
      if (i & (1 << j)) {
        subset.push(inp[j]);
      }
    }
    allCoalitions.push(subset);
  }

  return allCoalitions;
}

export const factorial = (n: number, r: number = 1) => {
  while (n > 0) r *= n--;
  return r;
}

export const coalitionsGenerateShapleyValue = (player: number, players: number[], coalitions: number[][], funcOfCoalitions: number[]) => {
  let shapleyValue = 0
  coalitions.forEach((coalition: number[]) => {
    if (coalition.includes(player)) {
      const valueOfCoalitionWithPlayer = funcOfCoalitions[indexOfArrayInArray(coalitions, coalition)]
      const coalitionWithoutPlayer = [...coalition]
      coalitionWithoutPlayer.splice(coalition.indexOf(player), 1)
      const valueOfCoalitionWithoutPlayer = funcOfCoalitions[indexOfArrayInArray(coalitions, coalitionWithoutPlayer)]
      const numberOfPermutationsC = factorial(coalitionWithoutPlayer.length)
      const numberOfPermutationsA = factorial(players.length - coalitionWithoutPlayer.length - 1)
      const contrCount = numberOfPermutationsA * numberOfPermutationsC / factorial(players.length)
      shapleyValue += (valueOfCoalitionWithPlayer - valueOfCoalitionWithoutPlayer) * contrCount
    }
  })

  return Number(shapleyValue.toFixed(2))
}

export const calculateAllShapleyValues = (players: number[], coalitions: number[][], funcOfCoalitions: number[]) => {
  const shapleyValues: number[] = []
  players.forEach((player: number) => {
    const playerShapleyValue = coalitionsGenerateShapleyValue(player, players, coalitions, funcOfCoalitions)
    shapleyValues.push(playerShapleyValue)
  })
  return shapleyValues
}
export const generateCoalitionOfN = (event: number) => Array.from({ length: event }, (v, k) => k + 1)