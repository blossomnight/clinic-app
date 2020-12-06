import React from "react";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import TopMenu from "../../components/TopMenu/TopMenu";

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
        <TopMenu />
        "WYNIKI BADAŃ"
        <ListingContainer />
      </div>
    );
  }
}
