import React from "react";
import {
  ReservedConsultation,
  RowPlaceholders,
} from "../../utils/shared-types";
import { DataRow } from "../../components/DataRow/DataRow";
import TestsMock from "../../mocks/TestResultsListData.json";
import HeadersData from "../../utils/@Listing-container-headers.json";
import "./ListingContainer.css";

type ListingContainerProps = {
  mainData: Array<Array<string>>;
  headers: Array<string>;
};

type ListingContainerState = {
  rows?: Array<RowPlaceholders>;
};

export class ListingContainer extends React.Component<
  ListingContainerProps,
  ListingContainerState
> {
  createDataRows = (): JSX.Element[] => {
    return this.props.mainData.map((row) => {
      return <DataRow placeholders={row}></DataRow>;
    });
  };

  render() {
    return (
      <div className="listing-container">
        <div className="table-row table-header">
          {this.props.headers.map((header) => {
            return (
              <div className="table-headline">
                <span>{header}</span>
              </div>
            );
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
