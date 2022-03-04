import React from "react";
import { Button, Table } from "antd";
import Column from "antd/lib/table/Column";
import {
  setCoalitionsCoalitions,
  setCoalitionsFunctionOfCoalitions,
  setCoalitionsNumberOfplayers,
  setGraphEdges,
  setGraphNodes,
  setGraphNumberOfPlayers,
  setGraphShapleyValues,
  setMCNetsNumberOfPlayers,
  setMCNetsRules,
} from "../../../redux/actions";
import { GraphGame, IMCNetsRule, Store } from "../../../type";
import { connect } from "react-redux";
import { coalitionsExamples, graphExamples, mcNetsExamples } from "./examples";
import { TabsKeys } from "../../layout/body/app-body/app-body";
import { IEdge, INode } from "react-digraph";

interface IGameExamplesProps {
  setActiveTabKey: React.Dispatch<React.SetStateAction<TabsKeys>>;
  setMCNetsNumberOfPlayers: (nrOfPlayes: number) => void;
  setMCNetsRules: (rules: IMCNetsRule[]) => void;
  setCoalitionsNumberOfplayers: (nrOfPlayes: number) => {
    type: string;
    payload: number;
  };
  setCoalitionsCoalitions: (coalitions: number[][]) => {
    type: string;
    payload: number[][];
  };
  setCoalitionsFunctionOfCoalitions: (values: number[]) => {
    type: string;
    payload: number[];
  };
  setGraphNumberOfPlayers: (nrOfPlayes: number) => void;
  setGraphNodes: (nodes: INode[]) => void;
  setGraphEdges: (edges: IEdge[]) => void;
}

export const GameExamplesNotConnected = (
  props: IGameExamplesProps
): JSX.Element => {
  const {
    setActiveTabKey,
    setMCNetsNumberOfPlayers,
    setMCNetsRules,
    setCoalitionsNumberOfplayers,
    setCoalitionsCoalitions,
    setCoalitionsFunctionOfCoalitions,
    setGraphNumberOfPlayers,
    setGraphEdges,
    setGraphNodes,
  } = props;
  const loadCoalitionStructureGame = (chosenGame: string) => {
    switch (chosenGame) {
      case "something":
        setCoalitionsNumberOfplayers(coalitionsExamples[0].nrOfPlayers);
        setCoalitionsCoalitions(coalitionsExamples[0].coalitions);
        setCoalitionsFunctionOfCoalitions(
          coalitionsExamples[0].functionOfCoalitions
        );
        break;
      default:
        console.warn("Invalid game example");
    }
    setActiveTabKey("coalition");
  };
  const loadMCNetsGame = (chosenGame: string) => {
    switch (chosenGame) {
      case "something":
        setMCNetsNumberOfPlayers(mcNetsExamples[0].nrOfPlayers);
        setMCNetsRules(mcNetsExamples[0].rules);
        break;
      default:
        console.warn("Invalid game example");
    }
    setActiveTabKey("mc-nets");
  };
  const loadGraphGame = (chosenGame: string) => {
    switch (chosenGame) {
      case "something":
        setGraphNumberOfPlayers(graphExamples[0].nrOfPlayers);
        setGraphNodes(graphExamples[0].nodes);
        setGraphEdges(graphExamples[0].edges);
        break;
      default:
        console.warn("Invalid game example");
    }
    setActiveTabKey("graph");
  };
  const dataSource = [{ description: "Simple example", example: "something" }];
  const columns = [
    {
      title: "Game description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Run example",
      dataIndex: "example",
      key: "example",
      width: 280,
      render: (text: string) => (
        <div>
          <Button size="small" onClick={() => loadCoalitionStructureGame(text)}>
            Coalition Structures
          </Button>
          <Button size="small" onClick={() => loadMCNetsGame(text)}>
            MC-Nets
          </Button>
          <Button size="small" onClick={() => loadGraphGame(text)}>
            Graph
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="game-examples">
      <Table
        bordered={true}
        size="small"
        dataSource={dataSource}
        pagination={false}
        className="game-examples-table"
        showHeader
      >
        {columns.map((column) => (
          <Column {...column} />
        ))}
      </Table>
    </div>
  );
};

const mapStateToProps = (state: { aplication: Store }): GraphGame => {
  const { nrOfPlayes, edges, shapleyValues } = state.aplication.graph || {};
  return {
    nrOfPlayes,
    edges,
    shapleyValues,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: number | number[] | number[][] | IMCNetsRule[] | IEdge[] | INode[];
  }) => any
) => {
  return {
    setGraphShapleyValues: (values: number[]) =>
      dispatch(setGraphShapleyValues(values)),
    setMCNetsNumberOfPlayers: (nrOfPlayes: number) =>
      dispatch(setMCNetsNumberOfPlayers(nrOfPlayes)),
    setMCNetsRules: (rules: IMCNetsRule[]) => dispatch(setMCNetsRules(rules)),
    setCoalitionsNumberOfplayers: (nrOfPlayes: number) =>
      dispatch(setCoalitionsNumberOfplayers(nrOfPlayes)),
    setCoalitionsCoalitions: (coalitions: number[][]) =>
      dispatch(setCoalitionsCoalitions(coalitions)),
    setCoalitionsFunctionOfCoalitions: (values: number[]) =>
      dispatch(setCoalitionsFunctionOfCoalitions(values)),
    setGraphNumberOfPlayers: (nrOfPlayes: number) =>
      dispatch(setGraphNumberOfPlayers(nrOfPlayes)),
    setGraphEdges: (edges: IEdge[]) => dispatch(setGraphEdges(edges)),
    setGraphNodes: (nodes: INode[]) => dispatch(setGraphNodes(nodes)),
  };
};

export const GameExamples = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameExamplesNotConnected);

export default GameExamples;
