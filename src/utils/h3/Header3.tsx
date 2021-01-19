import * as React from "react";
import "./Header3.css";

type Header3Props = {
  iconName: string;
  contentText: string;
};

export const Header3: React.FunctionComponent<Header3Props> = (
  props: Header3Props
) => {
  return (
    <div className="header3-wrapper">
      {" "}
      <div className="h3-icon-wrapper">
        <i className={props.iconName}></i>
      </div>
      <div className="h3-header-wrapper">
        <p>{props.contentText}</p>
      </div>
    </div>
  );
};
