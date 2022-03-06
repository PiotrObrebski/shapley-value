import React from "react";
import { Form, InputNumber } from "antd";

interface IInputElementProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  label?: string;
}
export const InputElement = (props: IInputElementProps) => {
  const { label, value, setValue } = props;
  return (
    <div className="input-section">
      <Form layout="horizontal" size="middle" className="number-input">
        <Form.Item labelAlign="right" label={label ?? "Edge value"}>
          <InputNumber value={value} onChange={(e) => setValue(e)} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputElement;
