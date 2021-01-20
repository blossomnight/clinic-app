import React from "react";
import "./SignInForm.css";
import "./SignUpForm.css";
import { sendUserData, bodyData } from "../../screens/Form/ScreenUserForm";

type SignInFormState = {
  userEmail: string;
  userPassword: string;
  loginFailed: boolean;
};

type SignInFormProps = {
  onUserAuthenticated: () => void;
};

class SignInForm extends React.Component<SignInFormProps> {
  state: SignInFormState = {
    userEmail: "",
    userPassword: "",
    loginFailed: false,
  };

  constructor(props: SignInFormProps) {
    super(props);
  }

  handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const bodyData: bodyData = {
      email: this.state.userEmail,
      password: this.state.userPassword,
    };

    let promise: Promise<Response> = sendUserData(bodyData, "login", "POST");

    promise.then((response: Response) => {
      if (response.ok) {
        this.setState({
          loginFailed: false,
        });
        response.json().then((data) => {
          localStorage.setItem("token", data["success"]["token"]);
          localStorage.setItem("username", data["user"]["name"]);
          console.log(data);
        });
        this.props.onUserAuthenticated();
      } else {
        this.setState({
          loginFailed: true,
        });
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
            {this.state.loginFailed && (
              <div className="user-data-alert wrong">
                Niepoprawne dane logowania
              </div>
            )}
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
