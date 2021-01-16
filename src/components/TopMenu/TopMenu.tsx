import React from "react";
import "./TopMenu.css";

type TopMenuProps = {
  userName: string;
};

class TopMenu extends React.Component {
  constructor(props: TopMenuProps) {
    super(props);
  }

  render() {
    return (
      <div className="top-menu">
        <div className="user-menu"></div>
      </div>
    );
  }
}

export default TopMenu;
