interface Store {
  coalitions?: CoalitionsGame;
  mcNets?: McNetsGame;
  graph?: GraphGame;
}
interface CoalitionsGame {
  nrOfPlayes?: number;
  gameDefinition?: CoalitionsGameDefinition;
  shapleyValues?: number[];
}
type CoalitionsGameDefinition = {
  coalitions: number[][];
  values: number[]
};
interface McNetsGame {
  nrOfPlayes?: number;
}
interface GraphGame {
  nrOfPlayes?: number;
}
type INumberOfPlayers = 3 | 4 | 5 | 6 | 7;
