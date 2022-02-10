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
  const [nrPlayers, setNrPlayers] = useState<number>(0)
  const [rules, setRules] = useState<IMCNetsRule[]>([])
  const handleNumberOfPlayesChange = (event: number) => setNrPlayers(event)

  return (
    <div className="calculator-mc-nets">
      {nrPlayers}
      <NumberOfPlayersForm
        maxValue={20}
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />
      {rules.map((rule, index) => {
        return <MCNetsRule key={index} index={index} rules={rules} setRules={setRules} nrPlayers={nrPlayers} />
      })}
      <AddMCNetsRule rules={rules} setRules={setRules} />
    </div>
  )
}