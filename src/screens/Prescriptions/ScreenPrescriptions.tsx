import React from "react";
import { Header3 } from "../../utils/h3/Header3";
import "./ScreenPrescriptions.css";
import UserPrescriptions from "../../mocks/[TMP]Archiwum-Recept.json";
import { PrescriptionData } from "../../utils/shared-types";
import { PrescriptionDetails } from "../../components/PrescriptionDetails/PrescriptionDetails";

type ScreenPrescriptionsState = {
  selectedPrescription?: PrescriptionData
};

type ScreenPrescriptionsProps = {};

export class ScreenPrescriptions extends React.Component<
  ScreenPrescriptionsProps,
  ScreenPrescriptionsState
  > {
  state = {
    selectedPrescription: undefined
  }

  handlePrescriptionClick = (index: number) => {
    this.setState({
      selectedPrescription: UserPrescriptions["Prescriptions"][index]
    });
  }

  render() {
    return (
      <div className="screen prescriptions">
        <div className="prescriptions-box">
          <div className="functional-panel-box">
            <Header3 iconName="fi-rr-document" contentText="Archiwum recept" />
            <div className="prescription-archive-row row-names">
              <p>{"Data"}</p>
              <p>{"Nr recepty"}</p>
            </div>
            {UserPrescriptions["Prescriptions"].map(
              (prescription, index) => {
                return (
                  <div className="prescription-archive-row" onClick={() => this.handlePrescriptionClick(index)}>
                    <p>{prescription.date}</p>
                    <div className="table-divider"></div>
                    <p>{prescription.serialNumber}</p>
                  </div>
                );
              }
            )}
            {console.log(UserPrescriptions)}
          </div>
          <PrescriptionDetails prescriptionData={this.state.selectedPrescription} />
        </div>
      </div>
    );
  }
}
