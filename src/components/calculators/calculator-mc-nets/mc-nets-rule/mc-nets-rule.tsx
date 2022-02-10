import { Col, Input, Row } from "antd"
import { IMCNetsRule } from "../calculator-mc-nets";
export interface IMCNetsRuleProps {
  rule: IMCNetsRule
  setRules: React.Dispatch<React.SetStateAction<IMCNetsRule[]>>
}
export const MCNetsRule = (props: IMCNetsRuleProps): JSX.Element => {
  return (
    <div className="mc-nets-rule">
      <Row justify="center">
        <Col flex="auto">

        </Col>
        <Col flex="110px">
          <Input placeholder="Value" ></Input>
        </Col>
      </Row>
    </div>
  )
}