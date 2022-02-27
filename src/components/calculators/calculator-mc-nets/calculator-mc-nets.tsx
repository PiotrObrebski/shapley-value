import { Button, Col, Collapse, Row } from "antd";
import React, { useState } from "react";
import { calculateMCNetsShapleyValues } from "../../../utilities/calculation-functions";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import NumberOfPlayersForm from "../../shared-components/number-of-players-input";
import { AddMCNetsRule } from "./add-mc-nets-rule/add-mc-nets-rule";
import { MCNetsRule } from "./mc-nets-rule/mc-nets-rule";
import "./calculator-mc-nets.css";
import {
  setMCNetsNumberOfPlayers,
  setMCNetsShapleyValues,
} from "../../../redux/actions";
import { connect } from "react-redux";

interface ICalculatorMCNetsProps extends McNetsGame {
  setMCNetsNumberOfPlayers: (nrOfPlayes: number) => void;
  setMCNetsShapleyValues: (shapleyValues: number[]) => void;
}

export const CalculatorMCNetsNotConnected = (
  props: ICalculatorMCNetsProps
): JSX.Element => {
  const {
    nrOfPlayes,
    rules,
    shapleyValues,
    setMCNetsNumberOfPlayers,
    setMCNetsShapleyValues,
  } = props;
  const handleNumberOfPlayesChange = (event: number) =>
    setMCNetsNumberOfPlayers(event);
  const [activeKeys, setActiveKeys] = useState<string[]>(["1", "2"]);
  return (
    <div className="calculator-mc-nets">
      <Collapse
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
      >
        <Collapse.Panel header="Game Definition" key="1">
          <Row justify="center">
            <Col span={12}>
              <NumberOfPlayersForm
                maxValue={20}
                numberOfPlayers={nrOfPlayes}
                handleNumberOfPlayesChange={handleNumberOfPlayesChange}
              />
            </Col>
            <Col span={12}>
              <AddMCNetsRule />
            </Col>
          </Row>

          <div className="mc-nets-rules">
            {rules?.map((_rule, index) => {
              return <MCNetsRule key={index} index={index} />;
            })}
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          header=""
          key="2"
          showArrow={false}
          forceRender={true}
          collapsible="disabled"
          className="generate-panel"
        >
          <Row justify="center" gutter={32}>
            <Button
              type="primary"
              disabled={!nrOfPlayes}
              className="generate-button"
              onClick={() => {
                setMCNetsShapleyValues(
                  calculateMCNetsShapleyValues(rules ?? [], nrOfPlayes ?? 0)
                );
                const tmpActiveKeys = activeKeys.includes("3")
                  ? activeKeys
                  : [...activeKeys, "3"];
                setActiveKeys(tmpActiveKeys);
              }}
            >
              Calculate
            </Button>
          </Row>
        </Collapse.Panel>
        <Collapse.Panel
          header="Shapley Values"
          key="3"
          className="values-panel"
        >
          <DisplayGeneratedValues
            listShapleyValues={shapleyValues ?? []}
            tableMaxHeight={200}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state: { aplication: Store }): McNetsGame => {
  const { nrOfPlayes, rules, shapleyValues } = state.aplication.mcNets ?? {};
  return {
    nrOfPlayes: nrOfPlayes,
    rules: rules,
    shapleyValues: shapleyValues,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: number | number[] | IMCNetsRule[];
  }) => any
): {
  setMCNetsNumberOfPlayers: (nrOfPlayes: number) => void;
  setMCNetsShapleyValues: (shapleyValues: number[]) => void;
} => {
  return {
    setMCNetsNumberOfPlayers: (nrOfPlayes: number) =>
      dispatch(setMCNetsNumberOfPlayers(nrOfPlayes)),
    setMCNetsShapleyValues: (shapleyValues: number[]) =>
      dispatch(setMCNetsShapleyValues(shapleyValues)),
  };
};
export const CalculatorMCNets = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorMCNetsNotConnected);

export default CalculatorMCNets;
