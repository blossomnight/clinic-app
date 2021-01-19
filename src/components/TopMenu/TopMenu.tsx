import React from "react";
import "./TopMenu.css";

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
    this.setState({
      isDropDownVisible: true,
    });
  };
  render() {
    return (
      <div className="top-menu">
        <div className="user-menu" onClick={this.handleShowDropDown}>
          <div className="icon-wrapper">
            <i className="fi-rr-user"></i>
          </div>
          <p>Witaj, User23!</p>
          <div className="icon-wrapper">
            <i className="fi-rr-menu-dots-vertical"></i>
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
