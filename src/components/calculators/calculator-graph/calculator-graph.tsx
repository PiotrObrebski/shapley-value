import React, { useState } from "react";
import { Button, Collapse } from "antd";
import { connect } from "react-redux";
import { setGraphShapleyValues } from "../../../redux/actions";
import { GraphGame, Store } from "../../../type";
import {
  calculateGraphShapleyValues,
  generateCoalitionOfN,
} from "../../../utilities/calculation-functions";
import Graph from "./graph";
import { GraphInputSection } from "./graph-input-section";
import { InformationSection } from "./information-section";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import "./calculator-graph.scss";
interface ICalculatorGraphProps extends GraphGame {
  setGraphShapleyValues: (values: number[]) => void;
}

export const CalculatorGraphNotConnected = (props: ICalculatorGraphProps) => {
  const { nrOfPlayes, edges, shapleyValues, setGraphShapleyValues } = props;
  const [valueForEdge, setValueForEdge] = useState(0);
  const [activeKeys, setActiveKeys] = useState<string[]>(["2", "3"]);
  return (
    <div className="calculator-graph">
      <Collapse
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
      >
        <Collapse.Panel header="How to use it" key="1">
          <InformationSection />
        </Collapse.Panel>
        <Collapse.Panel
          header=""
          key="2"
          showArrow={false}
          forceRender={true}
          collapsible="disabled"
          className="generate-panel"
        >
          <GraphInputSection
            valueForEdge={valueForEdge}
            setValueForEdge={setValueForEdge}
          />
          <Button
            type="primary"
            disabled={!edges?.length}
            className="generate-button"
            onClick={() => {
              setActiveKeys(["2", "4"]);
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
        </Collapse.Panel>
        <Collapse.Panel header="Graph Game Definition" key="3">
          <Graph valueForEdge={valueForEdge.toString()} />
        </Collapse.Panel>
        <Collapse.Panel header="Calculated Shapley Values" key="4">
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
  dispatch: (arg0: { type: string; payload: number[] }) => any
) => {
  return {
    setGraphShapleyValues: (values: number[]) =>
      dispatch(setGraphShapleyValues(values)),
  };
};

export const CalculatorGraph = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorGraphNotConnected);

export default CalculatorGraph;
