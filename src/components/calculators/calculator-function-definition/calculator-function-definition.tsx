import { useState } from 'react';
import NumberOfPlayersForm from '../../shared-components/number-of-players-input';
import { FunctionDefinitionInput } from './function-definition-input';
export const CalculatorFunctionDefinition = (): JSX.Element => {
  const [grandCoalition, setGrandCalition] = useState<number[]>([]);
  const [coalitionsArray, setCoalitionsArray] = useState<number[][]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [shapleyValues, setShapleyValues] = useState<number[]>([])
  const [functionOfCoalitions, setFunctionOfCoalitions] = useState<number[]>([])
  const generateCoalitionOfN = (event: number) => Array.from({ length: event }, (v, k) => k + 1)
  const [listShapleyValues, setListShapleyValues] = useState<string[]>([])

  const handleNumberOfPlayesChange = (event: number) => {
    if (event < 10) {
      setGrandCalition(generateCoalitionOfN(event))
      setFunctionOfCoalitions(Array(2 ** event).fill(0))
      setShapleyValues([])
      setMessage(undefined)
    } else setMessage('Number of coalition members exceded!')
  }

  return (
    <div className="calculator-coalition-definition">
      <NumberOfPlayersForm
        maxValue={10}
        message={message}
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />

      <FunctionDefinitionInput
      // grandCoalition={grandCoalition}
      // coalitionsArray={coalitionsArray}
      // functionOfCoalitions={functionOfCoalitions}
      // setFunctionOfCoalitions={setFunctionOfCoalitions}
      />
    </div>
  );
};

export default CalculatorFunctionDefinition;
