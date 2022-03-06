import React from "react";
import { Table, InputNumber } from "antd";
import Column from "antd/lib/table/Column";
import { connect } from "react-redux";
import { setCoalitionsFunctionOfCoalitions } from "../../../redux/actions";
import { Store } from "../../../type";

export interface ICoalitionStructuresInputProps {
  coalitions?: number[][];
  functionOfCoalitions?: number[];
  setCoalitionsFunctionOfCoalitions: (values: number[]) => void;
}

export const CoalitionStructuresInputNotConnected = (
  props: ICoalitionStructuresInputProps
): JSX.Element => {
  const {
    coalitions,
    functionOfCoalitions,
    setCoalitionsFunctionOfCoalitions,
  } = props;
  const dataSource = coalitions?.map((coalition, index) => ({
    key: index,
    coalition: coalition.length ? coalition.toString() : "Ø",
    value: 0,
  }));

  const columns = [
    {
      title: "Coalition",
      dataIndex: "coalition",
      key: "coalition",
      align: "right" as "left" | "right" | "center",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text: string, record: any) => (
        <InputNumber
          value={functionOfCoalitions?.[record.key]}
          defaultValue={0}
          disabled={!record.key}
          onChange={(event: number) => {
            const tmpFunction = functionOfCoalitions
              ? [...functionOfCoalitions]
              : [];
            tmpFunction[record.key] = event;
            setCoalitionsFunctionOfCoalitions(tmpFunction);
          }}
        />
      ),
      align: "left" as "left" | "right" | "center",
    },
  ];

  return (
    <Table
      bordered={true}
      size="small"
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: 300 }}
      className="coalition-structures-input"
    >
      {columns.map((column) => (
        <Column {...column} />
      ))}
    </Table>
  );
};

const mapStateToProps = (state: {
  aplication: Store;
}): {
  coalitions?: number[][];
  functionOfCoalitions?: number[];
} => {
  return {
    coalitions: state.aplication.coalitions?.coalitions,
    functionOfCoalitions: state.aplication.coalitions?.functionOfCoalitions,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: number[] }) => any
) => {
  return {
    setCoalitionsFunctionOfCoalitions: (values: number[]) =>
      dispatch(setCoalitionsFunctionOfCoalitions(values)),
  };
};
export const CoalitionStructuresInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoalitionStructuresInputNotConnected);
export default CoalitionStructuresInput;
