import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setContentKey } from '../../../redux/actions';

interface IAppMenuProps {
  setContentKey: (content:string) => void
}

const AppMenuNotConnected = (props: IAppMenuProps): JSX.Element => {
  const {setContentKey} = props
  const [appContentKey, setAppContentKey] = useState<string | undefined>('function');

  useEffect(()=>{    
    setContentKey(appContentKey ?? '')
  }, [appContentKey, setContentKey])

  return (
    <Menu
      mode="horizontal"
      onClick={(event: MenuInfo) => setAppContentKey(event.key)}
    >
      <Menu.Item key="function">Simple characteristic function</Menu.Item>
      <Menu.Item key="coalition">Coalition structures values</Menu.Item>
    </Menu>
  );
};
const AppMenu = connect(null,{setContentKey})(AppMenuNotConnected)
export default AppMenu;
