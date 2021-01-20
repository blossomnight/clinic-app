import React from "react";
import { Header3 } from "../../utils/h3/Header3";
import "./ScreenPrescriptions.css";
import UserPrescriptions from "../../mocks/[TMP]Archiwum-Recept.json";
import { PrescriptionData } from "../../utils/shared-types";

export class ScreenPrescriptions extends React.Component {
  render() {
    return (
      <div className="screen prescriptions">
        <div className="prescriptions-box">
          <div className="functional-panel-box">
            <Header3 iconName="fi-rr-document" contentText="Archiwum recept" />
            {UserPrescriptions["Prescriptions"].map(
              (prescription: { serial_number: string; date: string }) => {
                return (
                  <div className="prescription-archive-row">
                    {prescription.date}
                    <div className="divider"></div>
                    {prescription.serial_number}
                  </div>
                );
              }
            )}
            {console.log(UserPrescriptions)}
          </div>
          <div className="prescriptions-search"></div>
        </div>
      </div>
    );
  }
}
