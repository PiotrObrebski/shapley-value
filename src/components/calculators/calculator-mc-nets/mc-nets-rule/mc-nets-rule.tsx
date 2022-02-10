import { MinusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Row } from "antd"
import { generateCoalitionOfN } from "../../../../utilities/calculationg-functions";
import { IMCNetsRule } from "../calculator-mc-nets";
export interface IMCNetsRuleProps {
  index: number
  nrPlayers: number
  rules: IMCNetsRule[]
  setRules: React.Dispatch<React.SetStateAction<IMCNetsRule[]>>
}
export const MCNetsRule = (props: IMCNetsRuleProps): JSX.Element => {
  const { index, nrPlayers, rules, setRules } = props
  function onChange(checkedValues: any) {
    console.log('checked = ', checkedValues);
  }

  const plainOptions = generateCoalitionOfN(nrPlayers).map(String)
  return (
    <div className="mc-nets-rule">
      <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
      <Button
        type="primary"
        shape="circle"
        icon={<MinusOutlined />}
        onClick={() => {

          const tmpRules = [...rules]
          tmpRules.splice(index, 1)

          console.log(index, tmpRules);
          setRules(tmpRules)
        }}
      />
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