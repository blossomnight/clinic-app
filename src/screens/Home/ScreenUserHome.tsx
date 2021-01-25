import React from "react";

import "./ScreenUserHome.css";
import { ScreenType } from "../../utils/shared-types";

type ScreenUserHomeProps = {
  onScreenChoice: (e: React.MouseEvent<HTMLDivElement>) => void;
};
export class ScreenUserHome extends React.Component<ScreenUserHomeProps> {
  render() {
    return (
      <div className="screen user-home">
        <div className="screen-choice-grid" onClick={this.props.onScreenChoice}>
          <div className="buttons-wrapper">
            <div>
              <button
                name={ScreenType[ScreenType.TypeTestResults]}
                className="screen-choice-button"
              >
                {"Wyniki Badań"}
              </button>
              <button
                name={ScreenType[ScreenType.TypePrescriptions]}
                className="screen-choice-button"
              >
                {"Odbierze E-receptę"}
              </button>
            </div>
            <div>
              <button
                name={ScreenType[ScreenType.TypeCreateConsultation]}
                className="screen-choice-button"
              >
                {"Umów wizytę"}
              </button>

              <button
                name={ScreenType[ScreenType.TypeConsultations]}
                className="screen-choice-button"
              >
                {"Twoje wizyty"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
