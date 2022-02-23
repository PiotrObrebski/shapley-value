import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { connect } from "react-redux"
import { setMCNetsRules } from "../../../../redux/actions"

export interface IAddMCNetsRuleProps {
  rules?: IMCNetsRule[]
  setMCNetsRules: (rules: IMCNetsRule[]) => void
}

export const AddMCNetsRuleNotConnected = (props: IAddMCNetsRuleProps): JSX.Element => {
  const { rules, setMCNetsRules } = props

  return (
    <div className="add-mc-nets-rule">
      <Row justify="center" align="middle">
        <Col flex="64px">Add Rule</Col>
        <Col flex="40px">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() =>
              setMCNetsRules([
                ...(rules ?? []),
                {
                  positivePlayers: [],
                  negativePlayers: [],
                  value: 0
                }])
            }
          />
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state: { aplication: Store }): McNetsGame => {
  return {
    rules: state.aplication.mcNets?.rules
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: IMCNetsRule[];
  }) => any
): {
  setMCNetsRules: (rules: IMCNetsRule[]) => void
} => {
  return {
    setMCNetsRules: (rules: IMCNetsRule[]) =>
      dispatch(setMCNetsRules(rules))
  };
};

export const AddMCNetsRule = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMCNetsRuleNotConnected);

export default AddMCNetsRule