import React from "react";
import "./DataRow.css";
import "../ListingContainer/ListingContainer.css";
type DataRowProps = {
  placeholders: Array<string>;
};
type DataRowState = {};
export class DataRow extends React.Component<DataRowProps, DataRowState> {
  render() {
    return (
      <div className="table-row">
        {this.props.placeholders.map((placeholder, index) => [
          <div className="table-cell">{placeholder}</div>,
          index !== this.props.placeholders.length - 1 ? (
            <div className="table-cell table-divider"></div>
          ) : (
            <></>
          ),
        ])}
      </div>
    );
  }
}
