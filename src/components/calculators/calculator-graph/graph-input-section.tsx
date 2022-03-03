import React from "react";
import { Form, InputNumber } from "antd";
interface IGraphInputSectionProps {
  valueForEdge: number;
  setValueForEdge: React.Dispatch<React.SetStateAction<number>>;
}
export const GraphInputSection = (props: IGraphInputSectionProps) => {
  const { valueForEdge, setValueForEdge } = props;
  return (
    <div className="graph-input-section">
      <Form
        layout="horizontal"
        size="middle"
        className="number-of-players-input"
      >
        <Form.Item labelAlign="right" label="Edge value">
          <InputNumber
            value={valueForEdge}
            onChange={(e) => setValueForEdge(e)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
