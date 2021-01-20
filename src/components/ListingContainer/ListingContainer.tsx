import React from "react";
import { RowPlaceholders } from "../../utils/shared-types";
import { DataRow } from "../../components/DataRow/DataRow";
import TestsMock from "../../mocks/TestResultsListData.json";
import HeadersData from "../../utils/@Listing-container-headers.json";
import "./ListingContainer.css";

type ListingContainerProps = {
  rows?: Array<RowPlaceholders>;
};

type ListingContainerState = {};

export class ListingContainer extends React.Component<
  ListingContainerProps,
  ListingContainerState
> {
  setRowsArray = (): Array<RowPlaceholders> => {
    return TestsMock["tests"].map((data) => {
      return {
        placeholder1: data.date,
        placeholder2: data.orderNumber,
        placeholder3: data.takenTests,
        placeholder4: data.department,
      };
    });
  };

  createDataRows = (): JSX.Element[] => {
    let rows: JSX.Element[] = this.setRowsArray().map((row) => {
      return <DataRow>{row.placeholder1}</DataRow>;
    });
    return rows;
  };

  render() {
    return (
      <div className="listing-container">
        <RowsInfo
          head1={"Data"}
          head2={"Kod Zlecenia"}
          head3={"Rodzaj Badania"}
          head4={"Punkt Pobrań"}
        />
        <div className="table-content">{this.createDataRows()}</div>

        <span className="dot"></span>
      </div>
    );
  }
}

type RowsInfoProps = {
  head1: string;
  head2: string;
  head3: string;
  head4: string;
};

export const RowsInfo = (props: RowsInfoProps) => {
  let { head1, head2, head3, head4 } = props;
  return (
    <div className="table-row table-header">
      <div className="table-headline">
        <span>{head1}</span>
      </div>
      <div className="table-headline">
        <span>{head1}</span>
      </div>
      <div className="table-headline">
        <span>{head2}</span>
      </div>
      <div className="table-headline">
        <span>{head1}</span>
      </div>
      <div className="table-headline">
        <span>{head3}</span>
      </div>
      <div className="table-headline">
        <span>{head3}</span>
      </div>
      <div className="table-headline">
        <span>{head4}</span>
      </div>
    </div>
  );
};
