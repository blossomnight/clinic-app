import React from "react";
import SignInForm from "../../components/Form/SignInForm";
import { SignUpForm } from "../../components/Form/SignUpForm";
import TopMenu from "../../components/TopMenu/TopMenu";
import { UserType } from "../../utils/shared-types";
import "./ScreenUserForm.css";

export type bodyData = {
  email: string;
  name?: string;
  password: string;
  c_password?: string;
  pesel?: string;
  specialization?: string;
};

const API_URL = process.env.REACT_APP_API_URL;

export let sendUserData = (
  bodyData: bodyData,
  action: string,
  method: string,
  userType?: UserType
): Promise<Response> => {
  let url = "";
  if (action == "register") {
    if (userType == UserType.Doctor) {
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

export class ScreenUserForm extends React.Component<ScreenUserFormProps> {
  constructor(props: ScreenUserFormProps) {
    super(props);
  }

  componentDidMount() {
    //localStorage.setItem("token", data["success"]["token"]);
    if (localStorage.getItem("token") !== null) {
      this.props.onUserAuthenticated();
    }
  }

  render() {
    return (
      <div className="screen-user-form">
        <TopMenu />
        <div className="user-form">
          <SignInForm onUserAuthenticated={this.props.onUserAuthenticated} />
          <SignUpForm />
        </div>
      </div>
    );
  }
}
