import { Form, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import './calculator-function-definition.css';

export const CalculatorFunctionDefinition = (): JSX.Element => {
  const [grandCoalition, setGrandoCalition] = useState<number[] | undefined>(undefined);
  const [coalitionsArray, setCoalitionsArray] = useState<number[][] | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    if (grandCoalition) {
      setCoalitionsArray(generateCoalitions(grandCoalition))
    }
  }, [grandCoalition])

  const generateCoalitionOfN = (event: number) => Array.from({ length: event }, (v, k) => k + 1)
  const generateCoalitionString = (coalition: number[]): string => coalition.toString()
  const handleNumberOfPlayesChange = (event: number) => {
    if (event < 10){
    setGrandoCalition(generateCoalitionOfN(event))
    setMessage(undefined)
  } else setMessage('Number of coalition members exceded!')}

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
              defaultValue={0}

            />
          </Form.Item>
        })}
      </Form>
    </div>
  );
};

export default CalculatorFunctionDefinition;
