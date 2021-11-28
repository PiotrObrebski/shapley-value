import { Form, InputNumber, Button, Row, List } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import RSC from "react-scrollbars-custom";
import './calculator-coalition-structures.scss';
import _ from 'underscore';
import { calculateAllShapleyValues, generateCoalitions } from '../../../utilities/calculationg-functions';
import NumberOfPlayersForm from './elements/number-of-players-input';
import CoalitionStructuresInput from './elements/coalition-structures-input';
import DisplayGeneratedValues from './elements/display-generated-values';

export const CalculatorCoalitionStructures = (): JSX.Element => {
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


  useEffect(() => {
    if (grandCoalition) {
      setCoalitionsArray(generateCoalitions(grandCoalition))
    }
  }, [grandCoalition])

  useEffect(() => {
    setListShapleyValues(
      shapleyValues.map((value: number, index: number) =>
        `shapley value of player ${index + 1} is ${value}`
      ))
  }, [shapleyValues])

  return (
    <div className="calculator-coalition-structures">
      <NumberOfPlayersForm
        message={message}
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />
      <CoalitionStructuresInput
        grandCoalition={grandCoalition}
        coalitionsArray={coalitionsArray}
        functionOfCoalitions={functionOfCoalitions}
        setFunctionOfCoalitions={setFunctionOfCoalitions}
      />
      <Row justify="center">
        <Button
          type="primary"
          disabled={!grandCoalition.length}
          className="generate-button"
          onClick={() => setShapleyValues(
            calculateAllShapleyValues(grandCoalition, coalitionsArray, functionOfCoalitions)
          )}>
          Generate
        </Button>
      </Row>
      <DisplayGeneratedValues listShapleyValues={listShapleyValues}/>
    </div>

  );
};

export default CalculatorCoalitionStructures;
