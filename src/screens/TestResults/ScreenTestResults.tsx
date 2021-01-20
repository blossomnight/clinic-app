import React from "react";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import { Header3 } from "../../utils/h3/Header3";

type TestResultsState = {
  isDetailsContainerVisible: boolean;
  isListingContainerVisible: boolean;
  selectedRowDetails: Array<string>;
  handleDetails: () => void;
};

export class ScreenTestResults extends React.Component {
  render() {
    return (
      <div className="screen tests-result">
        <Header3
          iconName={"fi-rr-document-signed"}
          contentText={"Wyniki badań"}
        ></Header3>
        <div className="component-wrapper">
          <ListingContainer />
        </div>
      </div>
    );
  }
}
