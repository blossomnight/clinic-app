import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import CSS from "csstype";
class ScreenUserForm extends React.Component {
  render() {
    let formScreenStyle: CSS.Properties = {
      display: "flex",
      height: "560px",
    };
    return (
      <div className="screen-user-form" style={formScreenStyle}>
        <SignInForm />
        <SignUpForm />
      </div>
    );
  }
}

export default ScreenUserForm;
