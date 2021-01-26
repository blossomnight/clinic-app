import * as React from "react";
import { Header3 } from "../../utils/h3/Header3";
import { PrescriptionData } from "../../utils/shared-types";
import "./PrescriptionDetails.css";
type PrescriptionDetailsProps = {
  prescriptionData?: PrescriptionData;
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
            prescriptionData === undefined ? "Wybierz receptę" :
            "Informacje o recepcie nr. " + prescriptionData.serialNumber
          }
        />
        <div className="details-box">
          <div className="details-box-row">
            <p className="data-name">{"Lekarz: " + (prescriptionData === undefined ? "#" : prescriptionData.doctor)}</p>
            <p>{"Wystawiona: " + (prescriptionData === undefined ? "#" : prescriptionData.date)}</p>
          </div>
          {
            prescriptionData !== undefined && (
              prescriptionData.medications.map(med => {
                return <div className="details-box-row"><p>{med}</p></div>
              })
            )
          }
        </div>
      </div>
    );
  }
}
