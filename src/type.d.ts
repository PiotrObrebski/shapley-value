import { INode, IEdge } from "react-digraph";

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
  rules?: IMCNetsRule[];
  shapleyValues?: number[];
}

interface IMCNetsRule {
  positivePlayers: string[];
  negativePlayers: string[];
  value: number;
}
interface GraphGame {
  nrOfPlayes?: number;
  edges?: IEdge[];
  nodes?: INode[];
  shapleyValues?: number[];
}
type INumberOfPlayers = 3 | 4 | 5 | 6 | 7;

declare global {
  interface String extends String {
    elementAfterSplit: (separator: string) => string | undefined;
  }
}
