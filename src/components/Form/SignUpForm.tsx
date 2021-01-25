import React from "react";
import "./SignUpForm.css";
import { bodyData, sendUserData } from "../../screens/Form/ScreenUserForm";
import UserDataMock from "../../mocks/UserSignUpData.json";
import { UserType } from "../../utils/shared-types";
import Specializations from "../../utils/@Specialization-List.json";

enum FormHeaderData {
  Doctor = "Jestem lekarzem",
  Patient = "Jestem pacjentem",
  Register = "Rejestracja",
}

type SignUpFormState = {
  passwordsMismatch: boolean;
  registerSuccessful?: boolean;
  userType: UserType;
  userEmail: string;
  userName: string;
  userSurname: string;
  userPesel: string;
  userPassword: string;
  userRetypePassword: string;
  userSpecialization: string;
  dropDownVisible: boolean;
};

// type SignUpFormProps = {};

export class SignUpForm extends React.Component {
  state: SignUpFormState = {
    passwordsMismatch: false,
    registerSuccessful: undefined,
    userType: UserType.None,
    userEmail: UserDataMock["User1"]["userEmail"],
    userName: UserDataMock["User1"]["userName"],
    userSurname: UserDataMock["User1"]["userSurname"],
    userPesel: UserDataMock["User1"]["userPesel"],
    userPassword: UserDataMock["User1"]["userPassword"],
    userRetypePassword: UserDataMock["User1"]["userRetypePassword"],
    userSpecialization: "",
    dropDownVisible: false,
  };

  handleFormOnSubmit = (event: React.MouseEvent<HTMLInputElement>): void => {
    const bodyData: bodyData = {
      email: this.state.userEmail,
      name: this.state.userName + " " + this.state.userSurname,
      password: this.state.userPassword,
      c_password: this.state.userRetypePassword,
      pesel: this.state.userPesel,
      specialization: this.state.userSpecialization,
    };

    event.preventDefault();
    if (this.state.userPassword !== this.state.userRetypePassword) {
      this.setState({ passwordsMismatch: true });
      return;
    } else {
      this.setState({ passwordsMismatch: false });
    }

    let promise: Promise<Response> = sendUserData(
      bodyData,
      "register",
      "POST",
      this.state.userType
    );

    promise.then((response: Response) => {
      this.setState({
        registerSuccessful: response.status === 200,
      });
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLFormElement>): void => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleUserChoice = (event: React.MouseEvent): void => {
    let value: any = event.currentTarget.getAttribute("value");
    let userType: number = parseInt(value);
    this.setState({
      userType: userType,
    });
  };

  handleGoBack = (): void => {
    this.setState({
      userType: UserType.None,
      passwordsMismatch: false,
      registerSuccessful: undefined,
    });
  };

  handleSpecializationChoice = (event: React.MouseEvent) => {
    const data = event.target as HTMLDivElement;
    this.setState({
      dropDownVisible: false,
      userSpecialization: data.innerHTML,
    });
  };

  handleDropDownOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.state.dropDownVisible) this.setState({ dropDownVisible: false });
    else this.setState({ dropDownVisible: true });
  };

  getHeader = (): string => {
    switch (this.state.userType) {
      case UserType.Doctor:
        return FormHeaderData.Doctor;
      case UserType.Patient:
        return FormHeaderData.Patient;
      default:
        return FormHeaderData.Register;
    }
  };

  render() {
    return (
      <div className="sign-up-form">
        <h3>{this.getHeader()}</h3>
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
              onChange={this.handleInputChange}
            >
              {this.state.registerSuccessful === true && (
                <div className="user-data-alert correct">
                  Udało się zarejestrować konto, można się zalogować
                </div>
              )}
              {this.state.registerSuccessful === false && (
                <div className="user-data-alert wrong">
                  Nie udało się zarejestrować konta: prawdopodobnie konto o
                  takim emailu jest już zarejestrowane
                </div>
              )}
              <label htmlFor="userEmail">Email:</label>
              <input
                autoFocus
                type="email"
                defaultValue={this.state.userEmail}
                id="userEmail"
              />
              <label htmlFor="userName">Imię:</label>
              <input
                type="text"
                defaultValue={this.state.userName}
                id="userName"
              />
              <label htmlFor="userSurname">Nazwisko:</label>
              <input
                type="text"
                defaultValue={this.state.userSurname}
                id="userSurname"
              />
              <label htmlFor="userPesel">PESEL:</label>
              <input
                type="text"
                defaultValue={this.state.userPesel}
                id="userPesel"
                maxLength={11}
              />
              <label htmlFor="userPassword">Hasło:</label>
              <input
                type="password"
                defaultValue={this.state.userPassword}
                id="userPassword"
              />
              <label htmlFor="userRetypePassword">Powtórz hasło:</label>
              <input
                type="password"
                defaultValue={this.state.userRetypePassword}
                id="userRetypePassword"
              />
              {this.state.passwordsMismatch && (
                <div className="user-data-alert wrong">
                  Hasła nie są identyczne
                </div>
              )}
              {this.state.userType === UserType.Doctor && (
                <div className="dropdown" onClick={this.handleDropDownOnClick}>
                  <button className="dropbutton">
                    {this.state.userSpecialization === ""
                      ? "Wybierz specjalizację"
                      : `${this.state.userSpecialization}`}
                  </button>
                  <div
                    className="dropdown-content"
                    style={
                      this.state.dropDownVisible
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {Specializations["Specialization"].map((data) => {
                      return (
                        <div onClick={this.handleSpecializationChoice}>
                          {data}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <input
                type="button"
                value="Zarejestruj"
                onClick={this.handleFormOnSubmit}
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}
