import { useState } from "react"
import NumberOfPlayersForm from "../../shared/number-of-players-input"
import { AddMCNetsRule } from "./add-mc-nets-rule/add-mc-nets-rule"
import { MCNetsRule } from "./mc-nets-rule/mc-nets-rule"
export interface IMCNetsRule {
  posisitePlayers: number[]
  negativePlayers: number[]
  value: number
}
export const CalculatorMCNets = (): JSX.Element => {
  const handleNumberOfPlayesChange = (event: number) => { }
  const [rules, setRules] = useState<IMCNetsRule[]>([])
  return (
    <div className="calculator-mc-nets">
      <NumberOfPlayersForm
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />
      {rules.map((rule, index) => {
        return <MCNetsRule key={index} rule={rule} setRules={setRules} />
      })}
      <AddMCNetsRule rules={rules} setRules={setRules} />
    </div>
  )
}