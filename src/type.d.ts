interface Store {
  coalitions?: CoalitionsGame;
  mcNets?: McNetsGame;
  graph?: GraphGame;
}
interface CoalitionsGame {
  nrOfPlayes?: number;
  coalitions?: number[][];
  functionOfCoalitions?: number[];
  shapleyValues?: number[];
}
interface McNetsGame {
  nrOfPlayes?: number;
}
interface GraphGame {
  nrOfPlayes?: number;
}
type INumberOfPlayers = 3 | 4 | 5 | 6 | 7;
