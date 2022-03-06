import React, { useState } from "react";
import { Button, Row, Table } from "antd";
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
import "./game-examples.scss";
import InputElement from "./input-element";
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
  const [kVariable, setKVariable] = useState(1);
  const [nrOfPlayers, setNrOfPlayers] = useState(1);
  const loadCoalitionStructureGame = (chosenGame: number) => {
    const example = coalitionsExamples(nrOfPlayers, kVariable)[chosenGame];
    setCoalitionsNumberOfplayers(example.nrOfPlayers);
    setCoalitionsCoalitions(example.coalitions);
    setCoalitionsFunctionOfCoalitions(example.functionOfCoalitions);
    setActiveTabKey("coalition");
  };
  const loadMCNetsGame = (chosenGame: number) => {
    const example = mcNetsExamples(nrOfPlayers, kVariable)[chosenGame];
    setMCNetsNumberOfPlayers(example.nrOfPlayers);
    setMCNetsRules(example.rules);
    setActiveTabKey("mc-nets");
  };
  const loadGraphGame = (chosenGame: number) => {
    const example = graphExamples(nrOfPlayers, kVariable)[chosenGame];
    setGraphNumberOfPlayers(example.nrOfPlayers);
    setGraphNodes(example.nodes);
    setGraphEdges(example.edges);
    setActiveTabKey("graph");
  };
  const dataSource = [
    {
      description: "f(C) = k*|C|",
      example: 0,
    },
    {
      description: "f(C) = |C|^k",
      example: 1,
    },
    {
      description: "f(C) = k*max(i in C)",
      example: 2,
    },
    {
      description: "f(C) = k*min(i in C)",
      example: 3,
    },
    {
      description: "f(C) = k*avg(i in C)",
      example: 4,
    },
    {
      description: "f(C) = k*|C|*uniform(0,1)",
      example: 5,
    },
    {
      description: "f(C) = k*|C|*normal(0,1)",
      example: 6,
    },
  ];
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
      render: (example: number) => (
        <div>
          <Button
            size="small"
            onClick={() => loadCoalitionStructureGame(example)}
          >
            Coalition Structures
          </Button>
          <Button size="small" onClick={() => loadMCNetsGame(example)}>
            MC-Nets
          </Button>
          <Button
            disabled={!!example}
            size="small"
            onClick={() => loadGraphGame(example)}
          >
            Graph
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="game-examples">
      <Row justify="space-around">
        <InputElement
          label="k value"
          value={kVariable}
          setValue={setKVariable}
        />
        <InputElement
          label="nr of Players"
          value={nrOfPlayers}
          setValue={setNrOfPlayers}
        />
      </Row>
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
  const { nrOfPlayers, edges, shapleyValues } = state.aplication.graph || {};
  return {
    nrOfPlayers,
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
