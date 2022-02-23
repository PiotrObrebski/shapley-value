import React from 'react'
import { Tabs } from 'antd';
import {
  CalculatorFunctionDefinition,
} from '../../../calculators/calculator-function-definition/calculator-function-definition';
import {
  CalculatorCoalitionStructures,
} from '../../../calculators/calculator-coalition-structures/calculator-coalition-structures';
import { CalculatorMCNets } from '../../../calculators/calculator-mc-nets/calculator-mc-nets';
import { CalculatorGraph } from '../../../calculators/calculator-graph/calculator-graph';

const { TabPane } = Tabs

export const AppBody = (): JSX.Element => {

  return (
    <Tabs centered>
      <TabPane tab="Coalition structures definition" key="coalition">
        <CalculatorCoalitionStructures />
      </TabPane >
      <TabPane tab="Function generating values" key="function" disabled>
        <CalculatorFunctionDefinition />
      </TabPane >
      <TabPane tab="MC-nets game representation" key="mc-nets">
        <CalculatorMCNets />
      </TabPane >
      <TabPane tab="Graph game representation" key="graph">
        <CalculatorGraph />
      </TabPane >
    </Tabs>
  )
};

export default AppBody;
