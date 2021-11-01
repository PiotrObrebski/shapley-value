import { Tabs } from 'antd';
import {
  CalculatorCoalitionDefinition,
} from '../../../calculators/calculator-coalition-definition/calculator-coalition-definition';
import {
  CalculatorFunctionDefinition,
} from '../../../calculators/calculator-function-definition/calculator-function-definition';

const { TabPane } = Tabs

export const AppBody = (): JSX.Element => {

  return (
    <Tabs centered>
      <TabPane tab="Simple characteristic function" key="function">
        <CalculatorFunctionDefinition />
      </TabPane >
      <TabPane tab="Coalition structures values" key="coalition" disabled>
        <CalculatorCoalitionDefinition />
      </TabPane >
    </Tabs>
  )
};

export default AppBody;
