import { Form, InputNumber } from "antd"
export interface INumberOfPlayersForm {
  numberOfPlayers?: number
  message?: string
  maxValue: number
  handleNumberOfPlayesChange?: (event: number) => void
}
export const NumberOfPlayersForm = (props: INumberOfPlayersForm): JSX.Element => {
  const { numberOfPlayers, message, maxValue, handleNumberOfPlayesChange } = props
  return <Form
    labelCol={{ span: 12 }}
    wrapperCol={{ span: 12 }}
    layout="horizontal"
    size="middle"
    className="number-of-players-input"
  >
    <div className="error-message">{message}</div>
    <Form.Item labelAlign="right" label="Number of players">
      <InputNumber
        min={0}
        max={maxValue - 1}
        defaultValue={0}
        value={numberOfPlayers}
        onChange={handleNumberOfPlayesChange}
      />
    </Form.Item>
  </Form>
}

export default NumberOfPlayersForm