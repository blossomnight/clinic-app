import React from "react";
import SignInForm from "../../components/Form/SignInForm";
import { SignUpForm } from "../../components/Form/SignUpForm";
import { UserType } from "../../utils/shared-types";
import "./ScreenUserForm.css";

const API_URL = process.env.REACT_APP_API_URL;

export type bodyData = {
  email: string;
  name?: string;
  password: string;
  c_password?: string;
  pesel?: string;
  specialization?: string;
};

export let sendUserData = (
  bodyData: bodyData,
  action: string,
  method: string,
  userType?: UserType
): Promise<Response> => {
  let url = "";
  if (action === "register") {
    if (userType === UserType.Doctor) {
      url = API_URL + action + "_doctor";
    } else {
      url = API_URL + action;
    }
  } else {
    url = API_URL + action;
  }
  return fetch(url, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
};

type ScreenUserFormProps = {
  onUserAuthenticated: () => void;
};

let validateUserToken = (): Promise<Response> => {
  let bodyData = localStorage.getItem("token");
  let token_validate: string = "Bearer " + bodyData;
  return fetch(API_URL + "details", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token_validate,
    },
  });
};

export class ScreenUserForm extends React.Component<ScreenUserFormProps> {
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      validateUserToken()
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      this.props.onUserAuthenticated();
    }
  }

  render() {
    return (
      <div className="screen-user-form">
        <div className="user-form">
          <SignInForm onUserAuthenticated={this.props.onUserAuthenticated} />
          <SignUpForm />
        </div>
      </div>
    );
  }
}
