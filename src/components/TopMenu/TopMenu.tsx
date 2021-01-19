import React from "react";
import "./TopMenu.css";
import CSS from "csstype";

type TopMenuProps = {
  userName: string;
  isDropDownVisible: boolean;
};

class TopMenu extends React.Component {
  state = {
    userName: "",
    isDropDownVisible: false,
  };
  constructor(props: TopMenuProps) {
    super(props);
  }

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
        <div className="user-menu" onClick={this.handleShowDropDown}>
          <div className="icon-wrapper">
            <i className="fi-rr-user"></i>
          </div>
          <p>Witaj, User23!</p>
          <div className="icon-wrapper">
            <i className="fi-rr-angle-small-up" style={dropDownIconStyle()}></i>
          </div>
        </div>
        {this.state.isDropDownVisible && (
          <div className="user-menu-dropdown"></div>
        )}
      </div>
    );
  }
}

export default TopMenu;
