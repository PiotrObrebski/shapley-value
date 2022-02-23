import React from 'react'
import { PageHeader } from 'antd';
import './app-header.css';

export const AppHeader = (): JSX.Element => {
  return <PageHeader
    title="Shapley Value Calculator"
    subTitle="Pick your game definition"
  />
}

export default AppHeader
