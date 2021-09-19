import './app-header.css';

import { PageHeader } from 'antd';
import React from 'react';

export const AppHeader = ():JSX.Element => {
  return <PageHeader
    title="Shapley Value Calculator"
    subTitle="Pick your game definition"
  />
}

export default AppHeader
