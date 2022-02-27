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
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        size="middle"
        className="number-of-players-input"
      >
        <Form.Item labelAlign="right" label="Edge Value">
          <InputNumber
            value={valueForEdge}
            onChange={(e) => setValueForEdge(e)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
