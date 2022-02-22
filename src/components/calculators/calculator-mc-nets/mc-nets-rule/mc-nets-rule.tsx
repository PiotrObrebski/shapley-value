import { MinusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Row } from "antd"
import { generateCoalitionOfN } from "../../../../utilities/calculation-functions";
import { IMCNetsRule } from "../calculator-mc-nets";
import './mc-nets-rule.scss'
import { PlayersGroup } from "./player-group/players-group";
export interface IMCNetsRuleProps {
  index: number
  nrPlayers: number
  rules: IMCNetsRule[]
  setRules: React.Dispatch<React.SetStateAction<IMCNetsRule[]>>
}
export const MCNetsRule = (props: IMCNetsRuleProps): JSX.Element => {
  const { index, nrPlayers, rules, setRules } = props
  const onPositiveChange = (checkedValues: string[]) => {
    const tmpRules = [...rules]
    tmpRules[index].positivePlayers = checkedValues
    tmpRules[index].negativePlayers = tmpRules[index].negativePlayers.filter(val => !checkedValues.includes(val));
    setRules(tmpRules)
  }
  const onNegativeChange = (checkedValues: any) => {
    const tmpRules = [...rules]
    tmpRules[index].negativePlayers = checkedValues
    tmpRules[index].positivePlayers = tmpRules[index].positivePlayers.filter(val => !checkedValues.includes(val));
    setRules(tmpRules)
  }

  const plainOptions = generateCoalitionOfN(nrPlayers).map(String)
  return (
    <div className="mc-nets-rule">
      <Row align="middle" wrap={false} justify="center">
        <Col flex="100px" className="mc-nets-rule-name">{`Rule nr ${index}`}
          <InputNumber
            placeholder="Value"
            onChange={(event) => {
              const tmpRules = [...rules]
              tmpRules[index].value = event as number
              setRules(tmpRules)
            }}
            value={rules[index].value}
          />
        </Col>
        <Col flex='auto' >
          <div className="player-group-name">Positive Players</div>
          <PlayersGroup onChange={onPositiveChange} value={rules[index].positivePlayers} options={plainOptions} />
        </Col>
        <Col flex='auto' >
          <div className="player-group-name">Negative Players</div>
          <PlayersGroup onChange={onNegativeChange} value={rules[index].negativePlayers} options={plainOptions} />
        </Col>
        <Col flex="32px" >
          <Button
            type="primary"
            shape="circle"
            icon={<MinusOutlined />}
            onClick={() => {
              const tmpRules = [...rules]
              tmpRules.splice(index, 1)
              setRules(tmpRules)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}