import { Tabs } from 'antd';
import {
  CalculatorFunctionDefinition,
} from '../../../calculators/calculator-function-definition/calculator-function-definition';
import {
  CalculatorCoalitionStructures,
} from '../../../calculators/calculator-coalition-structures/calculator-coalition-structures';

const { TabPane } = Tabs

export const AppBody = (): JSX.Element => {

  return (
    <Tabs centered>
      <TabPane tab="Coalition structures values" key="coalition">
        <CalculatorCoalitionStructures />
      </TabPane >
      <TabPane tab="Function generationg values" key="function">
        <CalculatorFunctionDefinition />
      </TabPane >
    </Tabs>
  )
};

export default AppBody;
