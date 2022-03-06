import React, { useState } from "react";
import { Tabs } from "antd";
import GameExamples from "../../../calculators/game-exaples/game-examples";
import { CalculatorCoalitionStructures } from "../../../calculators/calculator-coalition-structures/calculator-coalition-structures";
import { CalculatorMCNets } from "../../../calculators/calculator-mc-nets/calculator-mc-nets";
import { CalculatorGraph } from "../../../calculators/calculator-graph/calculator-graph";

const { TabPane } = Tabs;
export type TabsKeys = "coalition" | "example" | "mc-nets" | "graph";
export const AppBody = (): JSX.Element => {
  const [activeTabKey, setActiveTabKey] = useState<TabsKeys>("coalition");
  return (
    <Tabs
      activeKey={activeTabKey}
      onTabClick={(key: string) => setActiveTabKey(key as TabsKeys)}
      centered
    >
      <TabPane tab="Characteristic function" key="coalition">
        <CalculatorCoalitionStructures setActiveTabKey={setActiveTabKey} />
      </TabPane>
      <TabPane tab="Function generating values" key="example">
        <GameExamples setActiveTabKey={setActiveTabKey} />
      </TabPane>
      <TabPane tab="MC-nets game representation" key="mc-nets">
        <CalculatorMCNets setActiveTabKey={setActiveTabKey} />
      </TabPane>
      <TabPane tab="Graph game representation" key="graph">
        <CalculatorGraph setActiveTabKey={setActiveTabKey} />
      </TabPane>
    </Tabs>
  );
};

export default AppBody;
