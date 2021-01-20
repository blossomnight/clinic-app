import * as React from "react";
import "./Spinner.css";

export class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner-background">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
