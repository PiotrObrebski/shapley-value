import { Button, Col, Collapse, Row } from "antd";
import React, { useState } from "react";
import { calculateMCNetsShapleyValues } from "../../../utilities/calculation-functions";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import NumberOfPlayersForm from "../../shared-components/number-of-players-input";
import { AddMCNetsRule } from "./add-mc-nets-rule/add-mc-nets-rule";
import { MCNetsRule } from "./mc-nets-rule/mc-nets-rule";
import "./calculator-mc-nets.scss";
import {
  setMCNetsNumberOfPlayers,
  setMCNetsShapleyValues,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { Store, McNetsGame, IMCNetsRule } from "../../../type";

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
            <Col span={8}>
              <NumberOfPlayersForm
                maxValue={20}
                numberOfPlayers={nrOfPlayes}
                handleNumberOfPlayesChange={handleNumberOfPlayesChange}
              />
            </Col>
            <Col span={8}>
              <Button
                type="primary"
                disabled={!nrOfPlayes}
                className="generate-button"
                onClick={() => {
                  setMCNetsShapleyValues(
                    calculateMCNetsShapleyValues(rules ?? [], nrOfPlayes ?? 0)
                  );
                  setActiveKeys(["2"]);
                }}
              >
                Generate Shapley Values
              </Button>
            </Col>
            <Col span={8}>
              <AddMCNetsRule />
            </Col>
          </Row>
          <div className="mc-nets-rules">
            {rules?.length ? (
              <Row align="middle" wrap={false} justify="center">
                <Col flex="100px" className="mc-nets-rule-name"></Col>

                <Col flex="auto">
                  <div className="player-group-name">Positive Players</div>
                </Col>
                <Col flex="auto">
                  <div className="player-group-name">Negative Players</div>
                </Col>
              </Row>
            ) : null}
            {rules?.map((_rule, index) => {
              return <MCNetsRule key={index} index={index} />;
            })}
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          header="Shapley Values"
          key="2"
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
    nrOfPlayes,
    rules,
    shapleyValues,
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
