import { Button, Form, InputNumber } from 'antd';
export const CalculatorFunctionDefinition = (): JSX.Element => {
  return (
    <div className="calculator-coalition-definition">
      <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
        layout="horizontal"
      >
        <Form.Item label="Number of players">
          <InputNumber
            min={3}
            max={7}
            defaultValue={3}
          />
        </Form.Item>
        <Form.Item label="">
          <Button>Generate Coalitions</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CalculatorFunctionDefinition;
