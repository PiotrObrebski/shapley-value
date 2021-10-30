import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  CalculatorCoalitionDefinition,
} from '../../../calculators/calculator-coalition-definition/calculator-coalition-definition';
import {
  CalculatorFunctionDefinition,
} from '../../../calculators/calculator-function-definition/calculator-function-definition';

interface IAppBodyProps {
  applicationKey?: string;
}

const AppBodyNotConnected = (props: IAppBodyProps): JSX.Element => {
  const { applicationKey } = props;
  const [
    calculatorToRender,
    setCalculatorToRender,
  ] = useState<JSX.Element | null>(null);
  const getCalculator = (key?: string): JSX.Element | null => {
    switch (key) {
      case "function":
        return <CalculatorFunctionDefinition />;
      case "coalition":
        return <CalculatorCoalitionDefinition />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setCalculatorToRender(getCalculator(applicationKey));
  }, [applicationKey]);
  return <div>{calculatorToRender}</div>;
};

const mapStateToProps = (state: {
  aplication: {
    applicationKey: string;
  };
}) => {
  const { aplication } = state;

  return { applicationKey: aplication.applicationKey };
};

const AppBody = connect(mapStateToProps, null)(AppBodyNotConnected);

export default AppBody;
