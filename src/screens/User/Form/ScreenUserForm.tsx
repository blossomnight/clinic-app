import React from "react";
import SignInForm from "../../../components/User/Form/SignInForm";
import SignUpForm from "../../../components/User/Form/SignUpForm";
import TopMenu from "../../../components/TopMenu/TopMenu";
import "./ScreenUserForm.css";

export type bodyData = {
  email: string;
  name?: string;
  password: string;
  c_password?: string;
};

const API_URL = "http://przyba.pl:8080/api/";

export let sendUserData = (
  bodyData: bodyData,
  action: string,
  method: string
): Promise<Response> => {
  return fetch(API_URL + action, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
};

export class ScreenUserForm extends React.Component {
  render() {
    return (
      <div className="screen-user-form">
        <TopMenu />
        <div className="user-form">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
    );
  }
}
