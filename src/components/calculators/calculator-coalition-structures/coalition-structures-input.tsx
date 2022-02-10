import { Table, InputNumber } from "antd";
import Column from "antd/lib/table/Column";

export interface ICoalitionStructuresInputProps {
  coalitionsArray: number[][]
  functionOfCoalitions: number[]
  setFunctionOfCoalitions: React.Dispatch<React.SetStateAction<number[]>>
}

export const CoalitionStructuresInput = (props: ICoalitionStructuresInputProps): JSX.Element => {
  const { coalitionsArray, functionOfCoalitions, setFunctionOfCoalitions } = props
  const dataSource = coalitionsArray?.map((coalition, index) => ({
    key: index,
    coalition: coalition.length ? coalition.toString() : 'Ø',
    value: 0,
  }))

  const columns = [
    {
      title: 'Coalition Structure',
      dataIndex: 'coalition',
      key: 'coalition',
      align: 'right' as 'left' | 'right' | 'center',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string, record: any) =>
        <InputNumber
          value={functionOfCoalitions[record.key]}
          defaultValue={0}
          onChange={(event: number) => {
            const tmpFunction = [...functionOfCoalitions]
            tmpFunction[record.key] = event
            setFunctionOfCoalitions(tmpFunction)
          }} />,
      align: 'left' as 'left' | 'right' | 'center',
    }
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
      {columns.map((column) => <Column {...column} />)}
    </Table>
  )
}

export default CoalitionStructuresInput
