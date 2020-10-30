import React from "react";
import { addEmitHelpers } from "typescript";
import "./SignInForm.css";

type SignInFormState = {
  userEmail: string;
  userPassword: string;
};

class SignInForm extends React.Component {
  state: SignInFormState = {
    userEmail: "",
    userPassword: "",
  };

  handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let promise: Promise<Response> = fetch("http://przyba.pl:8080/api/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.userEmail,
        password: this.state.userPassword,
      }),
    });

    promise.then((response: Response) => {
      if (response.ok) {
        alert("Poprawne logowanie");
        promise.then((response: Response) =>
          response.json().then((data) => {
            localStorage.setItem("token", data["success"]["token"]);
          })
        );
      } else {
        alert("Błąd przy logowaniu");
      }
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLFormElement>): void => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="sign-in-form">
        <h3>Logowanie</h3>
        <div>
          <form
            className="sign-in-form-container"
            onSubmit={this.handleFormOnSubmit}
            onChange={this.handleInputChange}
          >
            <span>Email:</span>
            <input
              type="email"
              defaultValue={this.state.userEmail}
              name="userEmail"
            />
            <span>Hasło:</span>
            <input
              type="password"
              defaultValue={this.state.userPassword}
              name="userPassword"
            />
            <input type="submit" value="Zaloguj" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignInForm;
