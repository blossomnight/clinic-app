import React from "react";
import "./TopMenu.css";
import CSS from "csstype";

type TopMenuProps = {
  onLogOut: () => void;
};

type TopMenuState = {
  userName: string;
  isDropDownVisible: boolean;
};

class TopMenu extends React.Component<TopMenuProps> {
  state = {
    isDropDownVisible: false,
    userName: "",
  };
  constructor(props: TopMenuProps) {
    super(props);
  }

  handleShowDropDown = (): void => {
    this.state.isDropDownVisible
      ? this.setState({
          isDropDownVisible: false,
          userName: localStorage.getItem("username") ?? "",
        })
      : this.setState({
          isDropDownVisible: true,
          userName: localStorage.getItem("username") ?? "",
        });
  };
  handleSignOut = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };
  render() {
    const dropDownIconStyle = (): CSS.Properties => {
      return this.state.isDropDownVisible
        ? {}
        : { transform: "rotate(-180deg)" };
    };
    return (
      <div className="top-menu">
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
              onClick={this.handleSignOut}
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
