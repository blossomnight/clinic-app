import React from "react";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import { Header3 } from "../../utils/h3/Header3";
import { TestResult } from "../../utils/shared-types";
import TestResultsMock from "../../mocks/TestResultsListData.json";

type ScreenTestResultsProps = {};

type ScreenTestResultsState = {
  testResults: Array<TestResult>;
};

const testResultToStringArray = (testResult: TestResult): Array<string> => {
  return [
    testResult.code.toString(),
    testResult.date.toString(),
    testResult.testType,
    testResult.laboratory,
  ];
};

const results: TestResult[] = [
  {
    code: "7173402321",
    date: "14 września 2020",
    testType: "Usługa - pobranie materiału, W...",
    laboratory: "21-040 Świdnik ul.Kruczkowskiego 6A",
  },
  {
    code: "0237173421",
    date: "25 lipca 2020",
    testType: "Bilirubina bezpośrednia, fosfataza alkaliczna (ALP)",
    laboratory: "21-040 Świdnik ul.Kruczkowskiego 6A",
  },
  {
    code: "5483402321",
    date: "20 lipca 2020",
    testType: "Ogólne badanie moczu z oceną mikroskopową osadu..",
    laboratory: "21-040 Świdnik ul.Kruczkowskiego 6A",
  },
  {
    code: "2393402321",
    date: "15 czerwca 2020",
    testType: "Wskaźnik protrombinowy (INR)...",
    laboratory: "21-040 Świdnik ul.Kruczkowskiego 6A",
  },
  {
    code: "1349002321",
    date: "13 marca 2020",
    testType: "Czas kaolinowo-kefalinowy (APTT)...",
    laboratory: "21-040 Świdnik ul.Kruczkowskiego 6A",
  },
  {
    code: "1348234992",
    date: "06 marca 2020",
    testType: "Cholesterol-HDL, cholesterol-LDL...",
    laboratory: "21-040 Świdnik ul.Kruczkowskiego 6A",
  },
];
export class ScreenTestResults extends React.Component<
  ScreenTestResultsProps,
  ScreenTestResultsState
> {
  state = {
    testResults: [],
  };

  componentDidMount() {
    this.setState({
      testResults: results,
    });
  }
  render() {
    return (
      <div className="screen tests-result">
        <Header3
          iconName={"fi-rr-document-signed"}
          contentText={"Wyniki badań"}
        ></Header3>
        <div className="component-wrapper">
          <ListingContainer
            mainData={this.state.testResults.map((result) =>
              testResultToStringArray(result)
            )}
            headers={["Kod zlecenia", "Data", "Badania", "Punkt pobrań"]}
            buttonText=""
            buttonCallback={() => {}}
          />
        </div>
      </div>
    );
  }
}
