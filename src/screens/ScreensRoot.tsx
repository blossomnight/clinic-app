import React from "react";
import { ScreenUserForm } from "./Form/ScreenUserForm";
import { ScreenUserHome } from "./Home/ScreenUserHome";

type ScreensRootState = {
  isLoggedIn: boolean;
};

class ScreensRoot extends React.Component {
  state: ScreensRootState = {
    isLoggedIn: false,
  };

  handleUserAuthenticated = (): void => {
    this.setState({
      isLoggedIn: true,
    });
  };

  handleUserLogout = (): void => {
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.isLoggedIn && (
          <ScreenUserForm onUserAuthenticated={this.handleUserAuthenticated} />
        )}
        {this.state.isLoggedIn && <ScreenUserHome />}
      </div>
    );
  }
}

export default ScreensRoot;
