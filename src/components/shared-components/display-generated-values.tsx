import React from 'react'
import { Table } from "antd";
import Column from "antd/lib/table/Column";

export interface IDisplayGeneratedValuesProps {
  listShapleyValues: number[]
  tableMaxHeight?: number
}

export const DisplayGeneratedValues = (props: IDisplayGeneratedValuesProps): JSX.Element => {
  const { listShapleyValues, tableMaxHeight } = props
  const dataSource = listShapleyValues.map((shapleuValue, index) => {
    return {
      key: index,
      value: shapleuValue,
      playerNumber: index + 1
    }
  })

  const columns = [{
    title: 'Player number',
    dataIndex: 'playerNumber',
    key: 'playerNumber',
    align: 'center' as 'left' | 'right' | 'center',
  }, {
    title: 'Player Shapley Value',
    dataIndex: 'value',
    key: 'value',
    align: 'center' as 'left' | 'right' | 'center',
  }]

  return (
    <Table
      bordered={true}
      size="small"
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: tableMaxHeight ?? 300 }}
      className="display-generated-values"
    >
      {columns.map((column) => <Column {...column} />)}
    </Table>
  )
}

export default DisplayGeneratedValues
