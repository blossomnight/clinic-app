import React from "react";
import "./SignUpForm.css";

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


class SignUpForm extends React.Component {
  state: SignUpFormState = {
    userType: UserType.None,
    userEmail: "mali@gmail.com",
    userName: "Jan",
    userSurname: "User",
    userPesel: "12345654321",
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
    this.setState({ [event.target.name]: event.target.value });
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
              onSubmit={this.handleFormOnSubmit}
              onChange={this.handleInputChange}
            >
              <span>Email:</span>
              <input
                type="email"
                defaultValue={this.state.userEmail}
                name="userEmail"
              />
              <span>Imię:</span>
              <input
                type="text"
                defaultValue={this.state.userName}
                name="userName"
              />
              <span>Nazwisko:</span>
              <input
                type="text"
                defaultValue={this.state.userSurname}
                name="userSurname"
              />
              <span>PESEL:</span>
              <input
                type="text"
                defaultValue={this.state.userPesel}
                name="userPesel"
                minLength={11}
                maxLength={11}
              />
              <span>Hasło:</span>
              <input
                type="password"
                defaultValue={this.state.userPassword}
                name="userPassword"
              />
              <span>Powtórz hasło:</span>
              <input
                type="password"
                defaultValue={this.state.userRetypePassword}
                name="userRetypePassword"
              />
              {this.state.userType === UserType.Doctor && (
                <div>
                  <span>Specjalizacja:</span>
                  <input
                    type="text"
                    defaultValue={this.state.userSpecialization}
                    name="userSpecialization"
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
