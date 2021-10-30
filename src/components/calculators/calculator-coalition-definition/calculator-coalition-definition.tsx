import { Button, Form, InputNumber } from 'antd';
import React, { useState } from 'react';

export const CalculatorCoalitionDefinition = (): JSX.Element => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<INumberOfPlayers>(3);
  const [coalitionsValues, setCoalitionsValues] = useState<number>();
  return (
    <div className="calculator-coalition-definition">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Number of players">
          <InputNumber
            min={3}
            max={7}
            defaultValue={3}
            onChange={(event: INumberOfPlayers) => setNumberOfPlayers(event)}
          />
        </Form.Item>
        <Form.Item>
          <Button>Generate Coalitions</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CalculatorCoalitionDefinition;
