import React from "react";

type TestResultsState = {
  isDetailsContainerVisible: boolean;
  isListingContainerVisible: boolean;
  selectedRowDetails: Array<string>;
  handleDetails: () => void;
};

export class ScreenTestResults extends React.Component {
  render() {
    return <div>"WYNIKI BADAŃ"</div>;
  }
}
