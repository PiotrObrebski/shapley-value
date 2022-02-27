import { Collapse } from "antd";
import React, { useState } from "react";
import Graph from "./graph";
import { GraphInputSection } from "./graph-input-section";
import { InformationSection } from "./information-section";

export const CalculatorGraph = () => {
  const [valueForEdge, setValueForEdge] = useState(0);
  return (
    <div className="calculator-graph">
      <Collapse>
        <Collapse.Panel header="How to use it" key="1">
          <InformationSection />
        </Collapse.Panel>
        <GraphInputSection
          valueForEdge={valueForEdge}
          setValueForEdge={setValueForEdge}
        />
      </Collapse>
      <Graph valueForEdge={valueForEdge} />
    </div>
  );
};
