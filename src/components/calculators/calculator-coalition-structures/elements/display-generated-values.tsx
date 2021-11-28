
import { List } from "antd";
import RSC from "react-scrollbars-custom";

export interface IDisplayGeneratedValuesProps {
  listShapleyValues: string[]
}

export const DisplayGeneratedValues = (props: IDisplayGeneratedValuesProps): JSX.Element => {
  const { listShapleyValues } = props

  return (
    <>
      {listShapleyValues.length
        ?
        <RSC style={{
          margin: "10px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 0 20px 4px #0000000a",
          width: "calc(100% - 32px)",
          minHeight: "250px",
          maxHeight: "40vh"
        }}>
          <List
            size="small"
            dataSource={listShapleyValues}
            renderItem={item =>
              <List.Item
                style={{
                  justifyContent: 'space-around',
                  borderBottom: '1px solid #ddd'
                }}
              >
                {item}
              </List.Item>}
          />
        </RSC>
        : null}
    </>
  )
}

export default DisplayGeneratedValues
