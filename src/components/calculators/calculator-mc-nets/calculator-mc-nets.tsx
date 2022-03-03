import { Button, Col, Collapse, Row } from "antd";
import React, { useState } from "react";
import {
  calculateMCNetsShapleyValues,
  generateCoalitionOfN,
  generateCoalitions,
  generateFunctionOfCoalitionsFromMCNets,
} from "../../../utilities/calculation-functions";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import NumberOfPlayersForm from "../../shared-components/number-of-players-input";
import { AddMCNetsRule } from "./add-mc-nets-rule/add-mc-nets-rule";
import { MCNetsRule } from "./mc-nets-rule/mc-nets-rule";
import "./calculator-mc-nets.scss";
import {
  setCoalitionsCoalitions,
  setCoalitionsFunctionOfCoalitions,
  setCoalitionsNumberOfplayers,
  setMCNetsNumberOfPlayers,
  setMCNetsShapleyValues,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { Store, McNetsGame, IMCNetsRule } from "../../../type";
import { TabsKeys } from "../../layout/body/app-body/app-body";

interface ICalculatorMCNetsProps extends McNetsGame {
  setActiveTabKey: React.Dispatch<React.SetStateAction<TabsKeys>>;
  setMCNetsNumberOfPlayers: (nrOfPlayes: number) => void;
  setMCNetsShapleyValues: (shapleyValues: number[]) => void;
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

export const CalculatorMCNetsNotConnected = (
  props: ICalculatorMCNetsProps
): JSX.Element => {
  const {
    nrOfPlayes,
    rules,
    shapleyValues,
    setActiveTabKey,
    setMCNetsNumberOfPlayers,
    setMCNetsShapleyValues,
    setCoalitionsNumberOfplayers,
    setCoalitionsCoalitions,
    setCoalitionsFunctionOfCoalitions,
  } = props;
  const handleNumberOfPlayesChange = (event: number) => {
    setMCNetsNumberOfPlayers(event);
    setMCNetsShapleyValues([]);
  };

  const [activeKeys, setActiveKeys] = useState<string[]>(["1"]);
  const translateMCNetsToCoalitions = () => {
    const coalitions = generateCoalitions(
      generateCoalitionOfN(nrOfPlayes ?? 0)
    );
    setCoalitionsNumberOfplayers(nrOfPlayes ?? 0);
    setCoalitionsCoalitions(coalitions);
    setCoalitionsFunctionOfCoalitions(
      generateFunctionOfCoalitionsFromMCNets(rules ?? [], coalitions)
    );
    setActiveTabKey("coalition");
  };
  return (
    <div className="calculator-mc-nets">
      <Collapse
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
      >
        <Collapse.Panel header="Game Definition" key="1">
          <Row justify="center" style={{ marginBottom: "16px" }}>
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
                  const tmpActiveKeys = activeKeys.includes("2")
                    ? activeKeys
                    : [...activeKeys, "2"];
                  setActiveKeys(tmpActiveKeys);
                }}
              >
                Generate Shapley Values
              </Button>
              <Button
                disabled={!nrOfPlayes && (nrOfPlayes ?? 0) < 10}
                className="generate-button"
                onClick={translateMCNetsToCoalitions}
                style={{ marginLeft: "16px" }}
              >
                Translate to Coalitions
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
    payload: number | number[] | number[][] | IMCNetsRule[];
  }) => any
) => {
  return {
    setMCNetsNumberOfPlayers: (nrOfPlayes: number) =>
      dispatch(setMCNetsNumberOfPlayers(nrOfPlayes)),
    setMCNetsShapleyValues: (shapleyValues: number[]) =>
      dispatch(setMCNetsShapleyValues(shapleyValues)),
    setCoalitionsNumberOfplayers: (nrOfPlayes: number) =>
      dispatch(setCoalitionsNumberOfplayers(nrOfPlayes)),
    setCoalitionsCoalitions: (coalitions: number[][]) =>
      dispatch(setCoalitionsCoalitions(coalitions)),
    setCoalitionsFunctionOfCoalitions: (values: number[]) =>
      dispatch(setCoalitionsFunctionOfCoalitions(values)),
  };
};
export const CalculatorMCNets = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorMCNetsNotConnected);

export default CalculatorMCNets;
