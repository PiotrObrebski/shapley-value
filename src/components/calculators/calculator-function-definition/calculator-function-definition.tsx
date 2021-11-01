import { Form, InputNumber, Button } from 'antd';
import { useEffect, useState } from 'react';
import './calculator-function-definition.css';
import _ from 'underscore';

export const CalculatorFunctionDefinition = (): JSX.Element => {
  const [grandCoalition, setGrandoCalition] = useState<number[]>([]);
  const [coalitionsArray, setCoalitionsArray] = useState<number[][]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [shapleyValues, setShapleyValues] = useState<number[]>([])
  const [functionOfCoalitions, setFunctionOfCoalitions] = useState<number[]>([])
  const generateCoalitionOfN = (event: number) => Array.from({ length: event }, (v, k) => k + 1)
  const generateCoalitionString = (coalition: number[]): string => coalition.toString()

  const handleNumberOfPlayesChange = (event: number) => {
    if (event < 10) {
      setGrandoCalition(generateCoalitionOfN(event))
      setFunctionOfCoalitions(Array(2 ** event).fill(0))
      setMessage(undefined)
    } else setMessage('Number of coalition members exceded!')
  }
  const indexOfArrayinArray = (arrayOfArrays: number[][], arrayToFind: number[]): number => {
    let indexOfArray = -1
    arrayOfArrays.forEach((array, index) => {
      if (_.isEqual(array, arrayToFind)) {
        indexOfArray = index
      }
    })
    return indexOfArray
  }
  const generateCoalitions = (inp: Array<number>) => {
    const length = inp.length;
    const allCoalitions = [];

    for (let i = 0; i < (Math.pow(2, length)); i++) {
      const subset = [];

      for (var j = 0; j < length; j++) {
        if (i & (1 << j)) {
          subset.push(inp[j]);
        }
      }

      allCoalitions.push(subset);
    }

    return allCoalitions;
  }
  function factorial(n: number, r: number = 1) {
    while (n > 0) r *= n--;
    return r;
  }
  const generateShapleyValue = (player: number, players: number[], coalitions: number[][], funcOfCoalitions: number[]) => {
    let shapleyValue = 0
    coalitions.forEach((coalition: number[]) => {
      if (coalition.includes(player)) {
        const valueOfCoalitionWithPlayer = funcOfCoalitions[indexOfArrayinArray(coalitions, coalition)]
        const coalitionWithoutPlayer = [...coalition]
        coalitionWithoutPlayer.splice(coalition.indexOf(player), 1)
        const valueOfCoalitionWithoutPlayer = funcOfCoalitions[indexOfArrayinArray(coalitions, coalitionWithoutPlayer)]
        const numberOfPermutationsC = factorial(coalitionWithoutPlayer.length)
        const numberOfPermutationsA = factorial(players.length - coalitionWithoutPlayer.length - 1)
        const contrCount = numberOfPermutationsA * numberOfPermutationsC / factorial(players.length)
        shapleyValue += (valueOfCoalitionWithPlayer - valueOfCoalitionWithoutPlayer) * contrCount
        console.log(shapleyValue, functionOfCoalitions, valueOfCoalitionWithPlayer, valueOfCoalitionWithoutPlayer, contrCount);
      }
    })

    return Number(shapleyValue.toFixed(2))
  }

  const calculateAllShapleyValues = (players: number[], coalitions: number[][], funcOfCoalitions: number[]) => {
    const shapleyValues: number[] = []
    players.forEach((player: number) => {
      const playerShapleyValue = generateShapleyValue(player, players, coalitions, funcOfCoalitions)

      shapleyValues.push(playerShapleyValue)
    })
    return shapleyValues
  }

  useEffect(() => {
    if (grandCoalition) {
      setCoalitionsArray(generateCoalitions(grandCoalition))
      // const tmpFunctionOfCoaltions = [...functionOfCoalitions]
      // functionOfCoalitions.forEach(element => {
      //   if (element === undefined) {

      //   }
      // })
    }
  }, [grandCoalition])

  return (
    <div className="calculator-function-definition">
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        size="small"
      >
        <div className="error-message" >{message}</div>
        <Form.Item label="Number of players">
          <InputNumber
            size="middle"
            min={0}
            max={10}
            defaultValue={0}
            onChange={handleNumberOfPlayesChange}
          />
        </Form.Item>
        {coalitionsArray?.map((coalition, index) => {
          const labelString = `Value of coalition {${generateCoalitionString(coalition)}}`
          return <Form.Item key={index} label={labelString}>
            <InputNumber
              min={0}
              max={28}
              value={functionOfCoalitions[index]}
              defaultValue={0}
              onChange={(event: number) => {
                const tmpFunction = [...functionOfCoalitions]
                tmpFunction[index] = event
                setFunctionOfCoalitions(tmpFunction)
              }}
            />
          </Form.Item>
        })}
      </Form>
      <Button
        onClick={() => setShapleyValues(
          calculateAllShapleyValues(grandCoalition, coalitionsArray, functionOfCoalitions)
        )
        }
      >Generate
      </Button>

      <div >
        {shapleyValues.map((value: number, index: number) =>
          <div className="shapley-value">
            {`shapley value of player ${index + 1} is ${value}`}
          </div>)}
      </div>
    </div>
  );
};

export default CalculatorFunctionDefinition;
