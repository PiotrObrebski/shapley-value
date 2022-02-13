import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, Row } from "antd"
import { IMCNetsRule } from "../calculator-mc-nets"
export interface IAddMCNetsRuleProps {
  rules: IMCNetsRule[]
  setRules: React.Dispatch<React.SetStateAction<IMCNetsRule[]>>
}
export const AddMCNetsRule = (props: IAddMCNetsRuleProps): JSX.Element => {
  const { rules, setRules } = props

  return (
    <div className="add-mc-nets-rule">
      <Row justify="center">
        <Col flex="40px">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() =>
              setRules([...rules, {
                posisitePlayers: [],
                negativePlayers: [],
                value: rules.length
              }])}
          />
        </Col>
      </Row>
    </div>
  )
}