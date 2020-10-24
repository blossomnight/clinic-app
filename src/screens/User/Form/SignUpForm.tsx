import React from "react";
import "./SignUpForm.css";
import CSS from "csstype";

enum UserType {
  None,
  Patient,
  Doctor,
}

enum HeaderData {
  REGISTER = "Rejestracja",
  PATIENT = "Jestem Pacjentem",
  DOCTOR = "Jestem Lekarzem",
}

type SignUpFormState = {
  headerData: string;
  userType: UserType;
};

type SignUpFormProps = {};

class SignUpForm extends React.Component {
  state: SignUpFormState = {
    headerData: HeaderData.REGISTER,
    userType: UserType.None,
  };

  handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  handleUserChoice = (event: React.MouseEvent): void => {
    let headerData: string;
    let value: any = event.currentTarget.getAttribute("value");
    let userType: number = parseInt(value);
    userType === UserType.Doctor
      ? (headerData = HeaderData.DOCTOR)
      : (headerData = HeaderData.PATIENT);
    this.setState({
      userType: userType,
      headerData: headerData,
    });
  };

  handleGoBack = (): void => {
    this.setState({
      userType: UserType.None,
      headerData: HeaderData.REGISTER,
    });
  };

  render() {
    let headerStyle: CSS.Properties = {
      transition: "width 2s",
      color: "pink",
    };

    return (
      <div className="sign-up-form">
        <h3 style={headerStyle}>{this.state.headerData}</h3>
        {this.state.userType === UserType.None && (
          <div>
            <button
              type="button"
              value={UserType.Doctor}
              onClick={this.handleUserChoice}
            >
              Jestem Lekarzem
            </button>
            <button
              type="button"
              value={UserType.Patient}
              onClick={this.handleUserChoice}
            >
              Jestem pacjentem
            </button>
          </div>
        )}

        {this.state.userType !== UserType.None && (
          <div>
            <button type="button" onClick={this.handleGoBack}>
              Wróć
            </button>

            <form
              className="sign-up-form-container"
              onSubmit={this.handleFormOnSubmit}
            >
              <input type="text" placeholder="Imię" />
              <input type="text" placeholder="Nazwisko" />
              <input type="submit" />

              {this.state.userType === UserType.Doctor && (
                <input type="text" placeholder="Specjalizacja" />
              )}
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default SignUpForm;
