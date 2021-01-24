import React, { Component } from "react";
import { ScreenUserForm } from "./Form/ScreenUserForm";
import { ScreenUserHome } from "./Home/ScreenUserHome";
import { ScreenType } from "../utils/shared-types";
import { ScreenTestResults } from "./TestResults/ScreenTestResults";
import { ScreenMyConsultations } from "./MyConsultations/ScreenMyConsultations";
import { ScreenCreateConsultation } from "./CreateConsultation/ScreenCreateConsultation";
import { ScreenPrescriptions } from "./Prescriptions/ScreenPrescriptions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import TopMenu from "../components/TopMenu/TopMenu";

type ScreensRootState = {
  isLoggedIn: boolean;
  currentScreen: JSX.Element;
};

type ScreensRootProps = {};

class ScreensRoot extends React.Component<ScreensRootProps, ScreensRootState> {
  state: ScreensRootState = {
    isLoggedIn: false,
    currentScreen: <></>,
  };

  handleUserAuthenticated = (): void => {
    let username = localStorage.getItem("username") ?? "";
    this.setState({
      isLoggedIn: true,
    });
  };

  handleUserLogout = (): void => {
    this.setState({
      isLoggedIn: false,
    });
  };

  // Dany Screen wysyła info jakim ScreenTypem jest
  // ScreensRoot procesuje tę informację i renderuje odpowiedni komponent
  // są pewne wątpliwości co do ustawiania state w componentDidMount()
  // poniewaz po odswiezeniu wracamy do HOME   ---------------------------------> ISSUE

  handleScreenChoice = (event: React.MouseEvent<HTMLDivElement>): void => {
    // this.setState({ [event.target.name]: event.target.value });

    const { name } = event.target as HTMLButtonElement;

    switch (name) {
      case ScreenType[ScreenType.TypeTestResults]:
        this.setState({
          currentScreen: <ScreenTestResults />,
        });
        break;
      case ScreenType[ScreenType.TypePerscriptions]:
        this.setState({
          currentScreen: <ScreenPrescriptions />,
        });
        break;
      case ScreenType[ScreenType.TypeConsultations]:
        this.setState({
          currentScreen: <ScreenMyConsultations />,
        });
        break;
      case ScreenType[ScreenType.TypeCreateConsultation]:
        this.setState({
          currentScreen: <ScreenCreateConsultation />,
        });
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.setState({
      currentScreen: (
        <ScreenUserHome onScreenChoice={this.handleScreenChoice} />
      ),
    });
  }

  handleLogOut = (): void => {};

  render() {
    //let match = useRouteMatch();
    const { isLoggedIn, currentScreen } = this.state;
    return (
      <div className="root">
        {isLoggedIn && <TopMenu onLogOut={this.handleLogOut} />}
        {!isLoggedIn && (
          <ScreenUserForm onUserAuthenticated={this.handleUserAuthenticated} />
        )}
        {isLoggedIn && currentScreen}
      </div>
      // <Router>
      //   <Switch>
      //     </Route>
      //     <Route path={`/home`}>
      //     </Route>
      //   </Switch>
      // </Router>
    );
  }
}

export default ScreensRoot;
