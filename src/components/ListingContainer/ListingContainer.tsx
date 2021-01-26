import React from "react";
import { RowPlaceholders } from "../../utils/shared-types";
import { DataRow } from "../../components/DataRow/DataRow";
import "./ListingContainer.css";

type ListingContainerProps = {
  mainData: Array<Array<string>>;
  headers: Array<string>;
  buttonText: string;
  buttonCallback: (index: number) => void;
};

type ListingContainerState = {
  rows?: Array<RowPlaceholders>;
};
export class ListingContainer extends React.Component<
  ListingContainerProps,
  ListingContainerState
> {
  createDataRows = (): JSX.Element[][] => {
    let arr = this.props.mainData.map((row, index) => {
      return [
        <DataRow placeholders={row}>lol</DataRow>,
        this.props.buttonText !== "" ? (
          <div className="functional-button">
            <i className=" fi-rr-cross-circle"></i>
            <button value={index} onClick={this.handleButtonClick}>
              {this.props.buttonText}
            </button>
          </div>
        ) : (
          <></>
        ),
      ];
    });
    return arr;
  };

  handleButtonClick = (event: React.MouseEvent): void => {
    let value: any = event.currentTarget.getAttribute("value");
    this.props.buttonCallback(value);
  };

  render() {
    return (
      <div className="listing-container">
        <div className="table-row table-header">
          {this.props.headers.map((header, index) => {
            return [
              <div className="table-headline">
                <span>{header}</span>
              </div>,
              index !== this.props.headers.length - 1 ? (
                <div className="table-cell table-divider"></div>
              ) : (
                <></>
              ),
            ];
          })}
        </div>
        <div className="table-content">{this.createDataRows()}</div>

        <span className="dot"></span>
      </div>
    );
  }
}

// export const RowsInfo = (props: RowsInfoProps) => {
//   let { head1, head2, head3, head4 } = props;
//   return (
//     <div className="table-row table-header">
//       <div className="table-headline">
//         <span>{head1}</span>
//       </div>
//       <div className="table-headline">
//         <span>{head2}</span>
//       </div>
//       <div className="table-headline">
//         <span>{head3}</span>
//       </div>
//       <div className="table-headline">
//         <span>{head4}</span>
//       </div>
//     </div>
//   );
// };
