import { Button, Col, Collapse, Row } from "antd"
import { useState } from "react"
import { calculateMCNetsShapleyValues } from "../../../utilities/calculation-functions"
import DisplayGeneratedValues from "../../shared-components/display-generated-values"
import NumberOfPlayersForm from "../../shared-components/number-of-players-input"
import { AddMCNetsRule } from "./add-mc-nets-rule/add-mc-nets-rule"
import { MCNetsRule } from "./mc-nets-rule/mc-nets-rule"
import './calculator-mc-nets.scss'

export interface IMCNetsRule {
  positivePlayers: string[]
  negativePlayers: string[]
  value: number
}

export const CalculatorMCNets = (): JSX.Element => {
  const [nrPlayers, setNrPlayers] = useState<number>(0)
  const [rules, setRules] = useState<IMCNetsRule[]>([])
  const [shapleyValues, setShapleyValues] = useState<number[]>([])
  const handleNumberOfPlayesChange = (event: number) => setNrPlayers(event)
  const [activeKeys, setActiveKeys] = useState<string[]>(['1', '2'])
  return (
    <div className="calculator-mc-nets">
      <Collapse activeKey={activeKeys} onChange={(keys) => setActiveKeys(keys as string[])}>
        <Collapse.Panel header="Game Definition" key="1">
          <Row justify="center">
            <Col span={12}>
              <NumberOfPlayersForm
                maxValue={20}
                handleNumberOfPlayesChange={handleNumberOfPlayesChange}
              />
            </Col>
            <Col span={12}>
              <AddMCNetsRule rules={rules} setRules={setRules} />
            </Col>
          </Row>

          <div className="mc-nets-rules">
            {rules.map((rule, index) => {
              return <MCNetsRule key={index} index={index} rules={rules} setRules={setRules} nrPlayers={nrPlayers} />
            })}
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="" key="2" showArrow={false} forceRender={true} collapsible='disabled' className="generate-panel">
          <Row justify="center" gutter={32}>
            <Button
              type="primary"
              disabled={!nrPlayers}
              className="generate-button"
              onClick={() => {
                setShapleyValues(calculateMCNetsShapleyValues(rules, nrPlayers))
                const tmpActiveKeys = activeKeys.includes('3') ? activeKeys : [...activeKeys, '3']
                setActiveKeys(tmpActiveKeys)
              }}>
              Calculate
            </Button></Row>
        </Collapse.Panel>
        <Collapse.Panel header="Shapley Values" key="3" className="values-panel">
          <DisplayGeneratedValues listShapleyValues={shapleyValues} tableMaxHeight={200} />
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}