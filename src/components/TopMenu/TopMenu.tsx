import React from "react";
import "./TopMenu.css";
import CSS from "csstype";
import Logo from "../../utils/Logo/Logo";

type TopMenuProps = {
  onLogOut: () => void;
};

type TopMenuState = {
  userName: string;
  isDropDownVisible: boolean;
};

class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
  state = {
    isDropDownVisible: false,
    userName: localStorage.getItem("username") ?? "",
  };

  handleShowDropDown = (): void => {
    this.state.isDropDownVisible
      ? this.setState({
          isDropDownVisible: false,
        })
      : this.setState({
          isDropDownVisible: true,
        });
  };
  render() {
    const dropDownIconStyle = (): CSS.Properties => {
      return this.state.isDropDownVisible
        ? {}
        : { transform: "rotate(-180deg)" };
    };
    return (
      <div className="top-menu">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div className="user-menu" onClick={this.handleShowDropDown}>
          <div className="icon-wrapper">
            <i className="fi-rr-user"></i>
          </div>
          <p>Witaj, {this.state.userName}!</p>
          <div className="icon-wrapper">
            <i className="fi-rr-angle-small-up" style={dropDownIconStyle()}></i>
          </div>
        </div>
        {this.state.isDropDownVisible && (
          <div className="user-menu-dropdown">
            <div className="change-user-data menu-button">
              <p>Zmień dane</p>
              <div className="icon-wrapper">
                <i className="fi-rr-edit" />
              </div>
            </div>
            <div className="call-an-ambulance menu-button">
              <p>Wezwij karetkę</p>
              <div className="icon-wrapper">
                <i className="fi-rr-ambulance" />
              </div>
            </div>
            <div className="your-medicine menu-button">
              <p>Twoje leki</p>
              <div className="icon-wrapper">
                <i className=" fi-rr-medicine" />
              </div>
            </div>
            <div
              className="logout-button menu-button"
              onClick={this.props.onLogOut}
            >
              <p>Wyloguj się</p>
              <div className="icon-wrapper">
                <i className="fi-rr-sign-out" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TopMenu;
