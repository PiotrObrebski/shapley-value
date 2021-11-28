import { Form, InputNumber } from "antd";
import RSC from "react-scrollbars-custom";

export interface ICoalitionStructuresInputProps {
  grandCoalition: number[]
  coalitionsArray: number[][]
  functionOfCoalitions: number[]
  setFunctionOfCoalitions: React.Dispatch<React.SetStateAction<number[]>>
}

export const CoalitionStructuresInput = (props: ICoalitionStructuresInputProps): JSX.Element => {
  const { grandCoalition, coalitionsArray, functionOfCoalitions, setFunctionOfCoalitions } = props
  return (
    <RSC style={{
      marginTop: "10px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 20px 4px #0000000a",
      width: "100%",
      minHeight: '78px',
      height: `${grandCoalition.length ** 2 * 28 + 22}px`,
      maxHeight: "250px"
    }}>
      <Form
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        size="small"
        className={`function-inputs ${grandCoalition.length < 4 ? '' : 'scrolling'}`}
      >
        {coalitionsArray?.map((coalition, index) => {
          const labelString = `Value of coalition {${coalition.toString()}}`
          return <Form.Item key={index} labelAlign="right" label={labelString}>
            <InputNumber
              value={functionOfCoalitions[index]}
              defaultValue={0}
              onChange={(event: number) => {
                const tmpFunction = [...functionOfCoalitions]
                tmpFunction[index] = event
                setFunctionOfCoalitions(tmpFunction)
              }}
            />
          </Form.Item>
        })}
      </Form>
    </RSC>
  )
}

export default CoalitionStructuresInput
