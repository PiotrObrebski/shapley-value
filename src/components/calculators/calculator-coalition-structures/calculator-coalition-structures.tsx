import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./calculator-coalition-structures.scss";
import {
  calculateAllShapleyValues,
  generateCoalitions,
  generateCoalitionOfN,
} from "../../../utilities/calculationg-functions";
import CoalitionStructuresInput from "./coalition-structures-input";
import NumberOfPlayersForm from "../../shared-components/number-of-players-input";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import CSVReader from "react-csv-reader";
import { connect } from "react-redux";
import {
  setCoalitionsGameDefinition,
  setCoalitionsNumberOfplayers,
  setCoalitionsShapleyValues,
} from "../../../redux/actions";

interface ICalculatorCoalitionStructuresProps extends CoalitionsGame {
  setCoalitionsNumberOfplayers: (nrOfPlayes: number) => {
    type: string;
    payload: number;
  };
  setCoalitionsGameDefinition: (content: CoalitionsGameDefinition) => {
    type: string;
    payload: CoalitionsGameDefinition;
  };
  setCoalitionsShapleyValues: (content: number[]) => {
    type: string;
    payload: number[];
  };
}

const CalculatorCoalitionStructuresNotConnected = (
  props: ICalculatorCoalitionStructuresProps
): JSX.Element => {
  console.log(props);
  const {
    nrOfPlayes,
    gameDefinition,
    shapleyValues: shapleyValuesProps,
    setCoalitionsNumberOfplayers,
    setCoalitionsGameDefinition,
    setCoalitionsShapleyValues,
  } = props;
  const [grandCoalition, setGrandCalition] = useState<number[]>(
    nrOfPlayes ? generateCoalitionOfN(nrOfPlayes) : []
  );
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [shapleyValues, setShapleyValues] = useState<number[]>(
    shapleyValuesProps ?? []
  );
  const [functionOfCoalitions, setFunctionOfCoalitions] = useState<number[]>(
    gameDefinition?.values ?? []
  );
  const maxValue = 10;
  const handleNumberOfPlayesChange = (event: number) => {
    if (event < maxValue) {
      setCoalitionsNumberOfplayers(event);
      setGrandCalition(generateCoalitionOfN(event));

      setFunctionOfCoalitions(Array(2 ** event).fill(0));
      setShapleyValues([]);
      setMessage(undefined);
    } else setMessage("Number of coalition members exceded!");
  };

  useEffect(() => {
    if (grandCoalition) {
      setCoalitionsGameDefinition({
        coalitions: generateCoalitions(grandCoalition),
        values: functionOfCoalitions,
      });
    }
  }, [functionOfCoalitions, grandCoalition, setCoalitionsGameDefinition]);

  const handleForce = (data: any, fileInfo: any) => console.log(data, fileInfo);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) =>
      header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <div className="calculator-coalition-structures">
      <NumberOfPlayersForm
        maxValue={maxValue}
        message={message}
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <CoalitionStructuresInput
            coalitionsArray={gameDefinition?.coalitions ?? []}
            functionOfCoalitions={functionOfCoalitions}
            setFunctionOfCoalitions={setFunctionOfCoalitions}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Button
            type="primary"
            disabled={!grandCoalition.length}
            className="generate-button"
            onClick={() =>
              setShapleyValues(
                calculateAllShapleyValues(
                  grandCoalition,
                  gameDefinition?.coalitions ?? [],
                  functionOfCoalitions
                )
              )
            }
          >
            Generate
          </Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <DisplayGeneratedValues listShapleyValues={shapleyValues} />
        </Col>
      </Row>
      <div className="upload">
        <CSVReader
          cssClass="react-csv-input"
          label="Upload game definition from .csv file"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state: { aplication: Store }): CoalitionsGame => {
  const { coalitions } = state.aplication;
  return {
    nrOfPlayes: coalitions?.nrOfPlayes,
    gameDefinition: coalitions?.gameDefinition,
    shapleyValues: coalitions?.shapleyValues,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: number | number[] | CoalitionsGameDefinition;
  }) => any
) => {
  return {
    setCoalitionsNumberOfplayers: (nrOfPlayes: number) =>
      dispatch(setCoalitionsNumberOfplayers(nrOfPlayes)),
    setCoalitionsGameDefinition: (gameDefinition: CoalitionsGameDefinition) =>
      dispatch(setCoalitionsGameDefinition(gameDefinition)),
    setCoalitionsShapleyValues: (shapleyValues: number[]) =>
      dispatch(setCoalitionsShapleyValues(shapleyValues)),
  };
};
export const CalculatorCoalitionStructures = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorCoalitionStructuresNotConnected);
export default CalculatorCoalitionStructures;
