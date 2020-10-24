import React from "react";
import "./SignUpForm.css";

class SignUpForm extends React.Component {
  render() {
    return (
      <div className="sign-up-container">
        <h3>Rejestracja</h3>
        <div className="sign-up-container-buttons">
          <div>
            <input
              className="user-type-button"
              type="button"
              value="Jestem pacjentem"
            />
          </div>
          <div>
            <input
              className="user-type-button"
              type="button"
              value="Jestem lekarzem"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
