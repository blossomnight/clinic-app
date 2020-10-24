import { Console } from "console";
import React from "react";
import "./SignUpForm.css";

type SignUpFormState = {
  patientName: string;
  patientNumber: number;
  doctorName: string;
  doctorNumber: number;
};

class SignUpForm extends React.Component {
  state: SignUpFormState = {
    patientName: "Pacjent",
    patientNumber: 1,
    doctorName: "Lekarz",
    doctorNumber: 1,
  };

  handleUserTypeButtonPatient = (event: React.MouseEvent): void => {
    this.setState({
      patientNumber: this.state.patientNumber + 1,
    });
  };

  handleUserTypeButtonDoctor = (event: React.MouseEvent): void => {
    this.setState({
      doctorNumber: this.state.doctorNumber + 1,
    });
  };

  render() {
    return (
      <div className="sign-up-container">
        <h3>Rejestracja</h3>
        <div className="sign-up-container-buttons">
          <form></form>
          <div>
            <button
              className="user-type-button"
              type="button"
              onClick={this.handleUserTypeButtonPatient}
            >
              {this.state.patientName + " " + this.state.patientNumber}
            </button>
          </div>
          <div>
            <button
              className="user-type-button"
              type="button"
              onClick={this.handleUserTypeButtonDoctor}
            >
              {this.state.doctorName + " " + this.state.doctorNumber}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
