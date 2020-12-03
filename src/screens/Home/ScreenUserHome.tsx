import React from "react";
import TopMenu from "../../components/TopMenu/TopMenu";
import "./ScreenUserHome.css";

export class ScreenUserHome extends React.Component {
  render() {
    return (
      <div className="screen user-home">
        <TopMenu />
        <div className="screen-choice-grid">
          <div>
            <button className="screen-choice-button">
              {"Wyniki Badań"}
              {/* test-resu */}
            </button>
            <button className="screen-choice-button">
              {"Odbierze E-receptę"}
              {/* prescription  */}
            </button>
          </div>
          <div>
            <button className="screen-choice-button">
              {"Umów wizytę"}
              {/* consultations */}
            </button>
            <button className="screen-choice-button">
              {"Umów Konsultację"}
              {/* test-results */}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
