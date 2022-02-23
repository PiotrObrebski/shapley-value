import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./calculator-coalition-structures.scss";
import {
  calculateAllShapleyValues,
  generateCoalitions,
  generateCoalitionOfN,
} from "../../../utilities/calculation-functions";
import CoalitionStructuresInput from "./coalition-structures-input";
import NumberOfPlayersForm from "../../shared-components/number-of-players-input";
import DisplayGeneratedValues from "../../shared-components/display-generated-values";
import CSVReader from "react-csv-reader";
import { connect } from "react-redux";
import {
  setCoalitionsCoalitions,
  setCoalitionsFunctionOfCoalitions,
  setCoalitionsNumberOfplayers,
  setCoalitionsShapleyValues,
  setMCNetsNumberOfplayers,
  setMCNetsRules,
} from "../../../redux/actions";
import { TabsKeys } from "../../layout/body/app-body/app-body";

interface ICalculatorCoalitionStructuresProps extends CoalitionsGame {
  setActiveTabKey: React.Dispatch<React.SetStateAction<TabsKeys>>,
  setCoalitionsNumberOfplayers: (nrOfPlayes: number) => {
    type: string;
    payload: number;
  };
  setCoalitionsCoalitions: (coalitions: number[][]) => {
    type: string;
    payload: number[][];
  };
  setCoalitionsFunctionOfCoalitions: (values: number[]) => {
    type: string;
    payload: number[];
  };
  setCoalitionsShapleyValues: (content: number[]) => {
    type: string;
    payload: number[];
  };
  setMCNetsRules: (rules: IMCNetsRule[]) => {
    type: string;
    payload: IMCNetsRule[];
  };
  setMCNetsNumberOfplayers: (nrOfPlayes: number) => {
    type: string;
    payload: number[];
  };
}

const CalculatorCoalitionStructuresNotConnected = (
  props: ICalculatorCoalitionStructuresProps
): JSX.Element => {
  const {
    nrOfPlayes,
    coalitions,
    functionOfCoalitions,
    shapleyValues,
    setActiveTabKey,
    setCoalitionsNumberOfplayers,
    setCoalitionsCoalitions,
    setCoalitionsFunctionOfCoalitions,
    setCoalitionsShapleyValues,
    setMCNetsRules
  } = props;
  const [grandCoalition, setGrandCalition] = useState<number[]>(
    nrOfPlayes ? generateCoalitionOfN(nrOfPlayes) : []
  );
  const [message, setMessage] = useState<string | undefined>(undefined);
  const maxValue = 10;
  const handleNumberOfPlayesChange = (event: number) => {
    if (event < maxValue) {
      setCoalitionsNumberOfplayers(event);
      setGrandCalition(generateCoalitionOfN(event));
      setCoalitionsFunctionOfCoalitions(Array(2 ** event).fill(0));
      setCoalitionsShapleyValues([]);
      setMessage(undefined);
    } else setMessage("Number of coalition members exceded!");
  };

  useEffect(() => {
    if (grandCoalition) {
      const newCoalitions = generateCoalitions(grandCoalition);
      newCoalitions[0].unshift(0);
      setCoalitionsCoalitions(newCoalitions);
    }
  }, [grandCoalition, setCoalitionsCoalitions]);

  const handleForce = (data: any) => {
    const newCoalitions: number[][] = [];
    const newFunctionOfCoalitions: number[] = [];
    let numberOfPlayers = 0;

    data.forEach((row: number[]) => {
      row.pop();
      const currentCoalition = row.slice(0, -1);
      numberOfPlayers =
        currentCoalition.length > numberOfPlayers
          ? currentCoalition.length
          : numberOfPlayers;
      newCoalitions.push(currentCoalition);
      newFunctionOfCoalitions.push(row.slice(-1).pop() ?? 0);
    });

    setCoalitionsNumberOfplayers(numberOfPlayers);
    setCoalitionsCoalitions(newCoalitions);
    setCoalitionsFunctionOfCoalitions(newFunctionOfCoalitions);
  };

  const handleDownloadGameDefinition = () => {
    const gameDefinition: number[][] = coalitions?.map((coalition, index) => {
      return [...coalition, functionOfCoalitions?.[index] ?? 0];
    }) ?? [[0]];
    // gameDefinition[0].unshift(0);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      gameDefinition?.map((e) => e.join(",") + ",").join("\n");

    window.open(encodeURI(csvContent));
  };
  const translateToMCNets = () => {
    const newRules: IMCNetsRule[] = []
    let newNumberOfPlayers = 0
    functionOfCoalitions
      ?.forEach((value, index) => {
        if (value) {
          const coalition = coalitions?.[index]?.map(String) ?? []
          newNumberOfPlayers =
            coalition.length > newNumberOfPlayers
              ? Math.max(...(coalitions?.[index] ?? []))
              : newNumberOfPlayers
          newRules.push({
            positivePlayers: coalitions?.[index]?.map(String) ?? [],
            negativePlayers: [],
            value: value
          })
        }
      })
    setMCNetsRules(newRules)
    setMCNetsNumberOfplayers(newNumberOfPlayers)
    setActiveTabKey('mc-nets')
  }
  return (
    <div className="calculator-coalition-structures">
      <NumberOfPlayersForm
        numberOfPlayers={nrOfPlayes}
        maxValue={maxValue}
        message={message}
        handleNumberOfPlayesChange={handleNumberOfPlayesChange}
      />
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <CoalitionStructuresInput />
          <div className="upload">
            <CSVReader
              cssClass="react-csv-input"
              label={<span>Upload game definition from .csv file </span>}
              onFileLoaded={handleForce}
              inputName="input2"
              parserOptions={{
                header: false,
                dynamicTyping: true,
                skipEmptyLines: true,
              }}
            />
          </div>
          <div className="download">
            <Button onClick={handleDownloadGameDefinition}>
              Download Game Definition
            </Button>
          </div>
        </Col>
        <Col className="buttons-col" xs={24} sm={24} md={24} lg={4} xl={4}>
          <Button
            type="primary"
            disabled={!grandCoalition.length}
            className="generate-button"
            onClick={() =>
              setCoalitionsShapleyValues(
                calculateAllShapleyValues(
                  grandCoalition,
                  coalitions ?? [],
                  functionOfCoalitions ?? []
                )
              )
            }
          >
            Generate Shapley Values
          </Button>
          <Button
            disabled={!grandCoalition.length}
            className="generate-button"
            onClick={translateToMCNets}
          >
            Translate to MC Nets
          </Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <DisplayGeneratedValues listShapleyValues={shapleyValues ?? []} />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: { aplication: Store }): CoalitionsGame => {
  const { nrOfPlayes, coalitions, functionOfCoalitions, shapleyValues } = state.aplication.coalitions || {};
  return {
    nrOfPlayes: nrOfPlayes,
    coalitions: coalitions,
    functionOfCoalitions: functionOfCoalitions,
    shapleyValues: shapleyValues,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: number | number[] | number[][] | IMCNetsRule[];
  }) => any
) => {
  return {
    setCoalitionsNumberOfplayers: (nrOfPlayes: number) =>
      dispatch(setCoalitionsNumberOfplayers(nrOfPlayes)),
    setCoalitionsCoalitions: (coalitions: number[][]) =>
      dispatch(setCoalitionsCoalitions(coalitions)),
    setCoalitionsFunctionOfCoalitions: (values: number[]) =>
      dispatch(setCoalitionsFunctionOfCoalitions(values)),
    setCoalitionsShapleyValues: (shapleyValues: number[]) =>
      dispatch(setCoalitionsShapleyValues(shapleyValues)),
    setMCNetsRules: (rules: IMCNetsRule[]) =>
      dispatch(setMCNetsRules(rules)),
    setMCNetsNumberOfplayers: (nrOfPlayes: number) =>
      dispatch(setMCNetsNumberOfplayers(nrOfPlayes))
  };
};
export const CalculatorCoalitionStructures = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorCoalitionStructuresNotConnected);
export default CalculatorCoalitionStructures;
