import * as React from "react";
import { Header3 } from "../../utils/h3/Header3";
import { PrescriptionData } from "../../utils/shared-types";
import "./PrescriptionDetails.css";
type PrescriptionDetailsProps = {
  prescriptionData: PrescriptionData;
};
type PrescriptionDetailsState = {};
export class PrescriptionDetails extends React.Component<
  PrescriptionDetailsProps,
  PrescriptionDetailsState
> {
  render() {
    const { prescriptionData } = this.props;
    return (
      <div className="prescription-details-box">
        <Header3
          iconName={"fi-rr-stats"}
          contentText={
            "Informacje o recepcie nr. " + prescriptionData.serialNumber
          }
        />
        <div className="details-box">
          <div className="details-box-row">
            <p className="data-name">{"Lekarz: "}</p>
            <p>{prescriptionData.date}</p>
          </div>
        </div>
      </div>
    );
  }
}
