import React from "react";
import { MinusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Row } from "antd";
import { connect } from "react-redux";
import { setMCNetsRules } from "../../../../redux/actions";
import { generateCoalitionOfN } from "../../../../utilities/calculation-functions";
import "./mc-nets-rule.css";
import { PlayersGroup } from "./player-group/players-group";
export interface IMCNetsRuleProps {
  index: number;
  nrOfPlayes?: number;
  rules?: IMCNetsRule[];
  setMCNetsRules: (rules: IMCNetsRule[]) => void;
}
export const MCNetsRuleNotConnected = (
  props: IMCNetsRuleProps
): JSX.Element => {
  const { index, nrOfPlayes, rules, setMCNetsRules } = props;
  const onPositiveChange = (checkedValues: string[]) => {
    const tmpRules = [...(rules ?? [])];
    tmpRules[index].positivePlayers = checkedValues;
    tmpRules[index].negativePlayers = tmpRules[index].negativePlayers.filter(
      (val) => !checkedValues.includes(val)
    );
    setMCNetsRules(tmpRules);
  };
  const onNegativeChange = (checkedValues: any) => {
    const tmpRules = [...(rules ?? [])];
    tmpRules[index].negativePlayers = checkedValues;
    tmpRules[index].positivePlayers = tmpRules[index].positivePlayers.filter(
      (val) => !checkedValues.includes(val)
    );
    setMCNetsRules(tmpRules);
  };

  const plainOptions = generateCoalitionOfN(nrOfPlayes ?? 0).map(String);
  return (
    <div className="mc-nets-rule">
      <Row align="middle" wrap={false} justify="center">
        <Col flex="100px" className="mc-nets-rule-name">
          {`Rule nr ${index}`}
          <InputNumber
            placeholder="Value"
            onChange={(event) => {
              const tmpRules = [...(rules ?? [])];
              tmpRules[index].value = event as number;
              setMCNetsRules(tmpRules);
            }}
            value={rules?.[index].value}
          />
        </Col>
        <Col flex="auto">
          <div className="player-group-name">Positive Players</div>
          <PlayersGroup
            onChange={onPositiveChange}
            value={rules?.[index].positivePlayers ?? []}
            options={plainOptions}
          />
        </Col>
        <Col flex="auto">
          <div className="player-group-name">Negative Players</div>
          <PlayersGroup
            onChange={onNegativeChange}
            value={rules?.[index].negativePlayers ?? []}
            options={plainOptions}
          />
        </Col>
        <Col flex="32px">
          <Button
            type="primary"
            shape="circle"
            icon={<MinusOutlined />}
            onClick={() => {
              const tmpRules = [...(rules ?? [])];
              tmpRules.splice(index, 1);
              setMCNetsRules(tmpRules);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: { aplication: Store }): McNetsGame => {
  const { nrOfPlayes, rules } = state.aplication.mcNets ?? {};
  return {
    nrOfPlayes: nrOfPlayes,
    rules: rules,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: IMCNetsRule[] }) => any
): {
  setMCNetsRules: (rules: IMCNetsRule[]) => void;
} => {
  return {
    setMCNetsRules: (rules: IMCNetsRule[]) => dispatch(setMCNetsRules(rules)),
  };
};

export const MCNetsRule = connect(
  mapStateToProps,
  mapDispatchToProps
)(MCNetsRuleNotConnected);

export default MCNetsRule;
