import React, { useState } from "react";
import { Button, Collapse, Popover, Row } from "antd";
import { connect } from "react-redux";
import {
  setCoalitionsCoalitions,
  setCoalitionsFunctionOfCoalitions,
  setCoalitionsNumberOfplayers,
  setGraphShapleyValues,
  setMCNetsNumberOfPlayers,
  setMCNetsRules,
} from "../../../redux/actions";
import { GraphGame, IMCNetsRule, Store } from "../../../type";
import {
  calculateGraphShapleyValues,
  generateCoalitionOfN,
  generateCoalitions,
  generateFunctionOfCoalitionsFromEdges,
  generateMCNetsRulesFromEdges,
} from "../../../utilities/calculation-functions";
import Graph from "./graph";
import { InformationSection } from "./information-section";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import "./calculator-graph.scss";
import { TabsKeys } from "../../layout/body/app-body/app-body";
interface ICalculatorGraphProps extends GraphGame {
  setActiveTabKey: React.Dispatch<React.SetStateAction<TabsKeys>>;
  setGraphShapleyValues: (values: number[]) => void;
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
}

export const CalculatorGraphNotConnected = (props: ICalculatorGraphProps) => {
  const {
    nrOfPlayes,
    edges,
    shapleyValues,
    setActiveTabKey,
    setGraphShapleyValues,
    setMCNetsNumberOfPlayers,
    setMCNetsRules,
    setCoalitionsNumberOfplayers,
    setCoalitionsCoalitions,
    setCoalitionsFunctionOfCoalitions,
  } = props;
  const [activeKeys, setActiveKeys] = useState<string[]>(["1"]);
  const translateGraphToMCNets = () => {
    setMCNetsRules(generateMCNetsRulesFromEdges(edges ?? []));
    setMCNetsNumberOfPlayers(nrOfPlayes ?? 0);
    setActiveTabKey("mc-nets");
  };
  const translateGraphToCoalitions = () => {
    const coalitions = generateCoalitions(
      generateCoalitionOfN(nrOfPlayes ?? 0)
    );
    setCoalitionsNumberOfplayers(nrOfPlayes ?? 0);
    setCoalitionsCoalitions(coalitions);
    setCoalitionsFunctionOfCoalitions(
      generateFunctionOfCoalitionsFromEdges(coalitions, edges ?? [])
    );
    setActiveTabKey("coalition");
  };

  return (
    <div className="calculator-graph">
      <Row justify="space-around" style={{ marginBottom: "16px" }}>
        <Popover
          content={<InformationSection />}
          title="Description"
          trigger="hover"
        >
          <Button>How to use</Button>
        </Popover>
        <Button
          type="primary"
          disabled={!edges?.length}
          className="generate-button"
          onClick={() => {
            setActiveKeys(["2"]);
            setGraphShapleyValues(
              calculateGraphShapleyValues(
                generateCoalitionOfN(nrOfPlayes ?? 0),
                edges ?? []
              )
            );
          }}
        >
          Generate Shapley Values
        </Button>
        <Button
          disabled={!edges?.length}
          className="generate-button"
          onClick={translateGraphToMCNets}
        >
          Translate to MC Nets
        </Button>
        <Button
          disabled={!edges?.length || (nrOfPlayes ?? 0) > 9}
          className="generate-button"
          onClick={translateGraphToCoalitions}
        >
          Translate to Coalitions
        </Button>
      </Row>
      <Collapse
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
      >
        <Collapse.Panel header="Graph Game Definition" key="1">
          <Graph />
        </Collapse.Panel>
        <Collapse.Panel header="Calculated Shapley Values" key="2">
          <DisplayGeneratedValues listShapleyValues={shapleyValues ?? []} />
        </Collapse.Panel>
      </Collapse>
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
    payload: number | number[] | number[][] | IMCNetsRule[];
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
  };
};

export const CalculatorGraph = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorGraphNotConnected);

export default CalculatorGraph;
