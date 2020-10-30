import React from "react";
import "./SignUpForm.css";
import CSS from "csstype";
import { couldStartTrivia } from "typescript";

enum UserType {
  None,
  Patient,
  Doctor,
}

enum FormHeaderData {
  Doctor = "Jestem lekarzem",
  Patient = "Jestem pacjentem",
  Register = "Rejestracja",
}

type SignUpFormState = {
  userType: UserType;
  userEmail: string;
  userName: string;
  userSurname: string;
  userPesel: string;
  userPassword: string;
  userRetypePassword: string;
  userSpecialization: string;
};

type SignUpFormProps = {};

class SignUpForm extends React.Component {
  state: SignUpFormState = {
    userType: UserType.None,
    userEmail: "mali@gmail.com",
    userName: "Jan",
    userSurname: "User",
    userPesel: "1209120",
    userPassword: "PASS",
    userRetypePassword: "PASS",
    userSpecialization: "None",
  };

  handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.state.userPassword !== this.state.userRetypePassword) {
      alert("Hasła nie są identyczne");
      return;
    }
    let promise: Promise<Response> = fetch(
      "http://przyba.pl:8080/api/register",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          email: this.state.userEmail,
          name: this.state.userName + " " + this.state.userSurname,
          password: this.state.userPassword,
          c_password: this.state.userRetypePassword,
        }),
      }
    );

    promise.then((response: Response) => {
      alert(
        response.status == 200
          ? "Poprawna rejestracja"
          : "Błąd przy rejestracji"
      );
    });
    // promise.then((response: Response) =>
    //   response.json().then((data) => console.log(data["success"]["token"]))
    // );
  };

  handleInputChange = (event: React.ChangeEvent<HTMLFormElement>): void => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleUserChoice = (event: React.MouseEvent): void => {
    let headerData: string;
    let value: any = event.currentTarget.getAttribute("value");
    let userType: number = parseInt(value);
    this.setState({
      userType: userType,
    });
  };

  handleGoBack = (): void => {
    this.setState({
      userType: UserType.None,
    });
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
    let headerStyle: CSS.Properties = {
      transition: "width 2s",
      color: "pink",
    };

    return (
      <div className="sign-up-form">
        <h3 style={headerStyle}>{this.getHeader()}</h3>
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
              onChange={this.handleInputChange}
            >
              <label htmlFor="userEmail">Email:</label>
              <input
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
              {this.state.userType === UserType.Doctor && (
                <div>
                  <label htmlFor="userSpecialization">Specjalizacja:</label>
                  <input
                    type="text"
                    defaultValue={this.state.userSpecialization}
                    id="userSpecialization"
                  />
                </div>
              )}
              <input type="submit" value="Zarejestruj" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default SignUpForm;
