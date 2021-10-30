import { Form, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';

export const CalculatorFunctionDefinition = (): JSX.Element => {
  const [grandCoalition, setGrandoCalition] = useState<number[] | undefined>(undefined );
  const [coalitionsArray, setCoalitionsArray]= useState<number[][] | undefined>(undefined)
  const generateCoalitions = (inp: Array<number>)=>{
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

  useEffect(()=>{
    if(grandCoalition){
      setCoalitionsArray(generateCoalitions(grandCoalition))
    }
  }, [grandCoalition])

  const generateCoalitionOfN = (event: number) => Array.from({length: event}, (v, k) => k+1)

  return (
    <div className="calculator-function-definition">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="">
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            onChange={(event: number) => setGrandoCalition(generateCoalitionOfN(event))}
          />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <div>{coalitionsArray?.map(coalition => <div>{coalition}</div>)}</div>
    </div>
  );
};

export default CalculatorFunctionDefinition;
