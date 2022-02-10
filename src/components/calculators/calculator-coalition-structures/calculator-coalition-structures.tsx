import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import './calculator-coalition-structures.scss';
import { calculateAllShapleyValues, generateCoalitions } from '../../../utilities/calculationg-functions';
import CoalitionStructuresInput from './coalition-structures-input';
import NumberOfPlayersForm from '../../shared/number-of-players-input';
import DisplayGeneratedValues from '../../shared/display-generated-values';

export const CalculatorCoalitionStructures = (): JSX.Element => {
  const [grandCoalition, setGrandCalition] = useState<number[]>([]);
  const [coalitionsArray, setCoalitionsArray] = useState<number[][]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [shapleyValues, setShapleyValues] = useState<number[]>([])
  const [functionOfCoalitions, setFunctionOfCoalitions] = useState<number[]>([])
  const generateCoalitionOfN = (event: number) => Array.from({ length: event }, (v, k) => k + 1)

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


  return (
    <div className="calculator-coalition-structures">
      <NumberOfPlayersForm
        message={message}
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <CoalitionStructuresInput
            coalitionsArray={coalitionsArray}
            functionOfCoalitions={functionOfCoalitions}
            setFunctionOfCoalitions={setFunctionOfCoalitions}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Button
            type="primary"
            disabled={!grandCoalition.length}
            className="generate-button"
            onClick={() => setShapleyValues(
              calculateAllShapleyValues(grandCoalition, coalitionsArray, functionOfCoalitions)
            )}>
            Generate
          </Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <DisplayGeneratedValues listShapleyValues={shapleyValues} />
        </Col>
      </Row>
    </div>
  );
};

export default CalculatorCoalitionStructures;
