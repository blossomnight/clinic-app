
import React from "react";
import "./SignUpForm.css";

type SignUpFormState = {

};

class SignUpForm extends React.Component {
  state: SignUpFormState = {
  };

  handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    
  }

  render() {
    return (
      <div>
        <h3>Rejestracja</h3>
        <form className="sign-up-form-container" onSubmit={this.handleFormOnSubmit}>
                <SignUpForm/>
                <input type="submit"/>
            </form>
      </div>
    );
  }
}

export default SignUpForm;
