import { Checkbox } from "antd"
import './player-group.scss'

interface IPlayersGroupprops {
  options: string[]
  value: string[]
  onChange: (checkedValues: any) => void
}

export const PlayersGroup = (props: IPlayersGroupprops) => {
  const { options, value, onChange } = props
  return (
    <div className="player-group">
      <Checkbox.Group options={options} value={value} onChange={onChange} style={{ width: `calc(${options.length} * 52px)` }} />
    </div>
  )
}