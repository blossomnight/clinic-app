import React from "react";
import { Header3 } from "../../utils/h3/Header3";
import "./ScreenPrescriptions.css";
import UserPrescriptions from "../../mocks/[TMP]Archiwum-Recept.json";
import { Medication, PrescriptionData } from "../../utils/shared-types";
import { PrescriptionDetails } from "../../components/PrescriptionDetails/PrescriptionDetails";

type ScreenPrescriptionsState = {
  isSearchVisible: boolean;
};

type ScreenPrescriptionsProps = {};

const med1: Medication = { medicationId: 234, name: "Aspiryna", price: 23.4 };

const prescription1: PrescriptionData = {
  serialNumber: 3488729,
  date: "04 stycznia 2021",
  medications: [med1],
};

export class ScreenPrescriptions extends React.Component<
  ScreenPrescriptionsProps,
  ScreenPrescriptionsState
> {
  state = {
    isSearchVisible: false,
  };
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
              (prescription: { serial_number: string; date: string }) => {
                return (
                  <div className="prescription-archive-row">
                    <p>{prescription.date}</p>
                    <div className="table-divider"></div>
                    <p>{prescription.serial_number}</p>
                  </div>
                );
              }
            )}
            {console.log(UserPrescriptions)}
          </div>
          {this.state.isSearchVisible ? (
            <div className="prescriptions-search">"coś"</div>
          ) : (
            <PrescriptionDetails prescriptionData={prescription1} />
          )}
        </div>
      </div>
    );
  }
}
