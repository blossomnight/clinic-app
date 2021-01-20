import React from "react";
import "./DataRow.css";
import "../ListingContainer/ListingContainer.css";
type DataRowProps = {};
type DataRowState = {};
export class DataRow extends React.Component<DataRowProps, DataRowState> {
  render() {
    return (
      <div className="table-row">
        <div className="table-cell">{"12 marca 2020"}</div>
        <div className="table-cell table-divider"></div>
      </div>
    );
  }
}
