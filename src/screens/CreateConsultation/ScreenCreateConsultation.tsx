import React from "react";

import { SearchConsultationResults } from "../../components/SearchConsultationResults/SearchConsultationResults";
import { Spinner } from "../../utils/Spinner/Spinner";
import { Header3 } from "../../utils/h3/Header3";
import "./ScreenCreateConsultation.css";

import Specializations from "../../utils/@Specialization-List.json";
import { DentistsAvailability } from "../../mocks/DentistsAvailability";
import { DoctorDetails } from "../../utils/shared-types";
const API_URL = process.env.REACT_APP_API_URL;

type ScreenCreateConsultationState = {
  availableDoctors: DoctorDetails[];
  chosenSpecialization: boolean;
  spinner: false;
};

export class ScreenCreateConsultation extends React.Component {
  state = {
    availableDoctors: [
      {
        user_id: "1",
        specialization: "Okulista",
        name: "Hubert Okon",
        visits: [
          {
            date: "1610746912569",
          },
        ],
      },
      {
        user_id: "1",
        specialization: "Okulista",
        name: "Hubert Okon",
        visits: [
          {
            date: "1610746912569",
          },
        ],
      },
    ],
    chosenSpecialization: false,
    spinner: false,
  };

  handleSpecializationOnClick = (event: React.MouseEvent): void => {
    const { innerHTML } = event.target as HTMLDivElement;
    console.log(innerHTML);

    this.setState({ spinner: true });

    var params = { specialization: innerHTML };
    let url = new URLSearchParams(params).toString();
    url = API_URL + "doctors_specialization?" + url;
    console.log(url);
    let promise = fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    });

    promise.then((response: Response) => {
      response.json().then((data) => {
        // ustaw STATE z tablicą availableDoctors
        const result: DoctorDetails = data;
        console.log(data);
        this.setState({
          availableDoctors: result,
          chosenSpecialization: true,
        });
        this.setState({ spinner: false });
      });
    });

    // pobierz jsona z API
    // ustaw go w state
    // wyslij w propsach do SearchConsultationResults
  };

  componentDidMount() {}

  render() {
    return (
      <div className="screen create-consultation">
        <div className="consultations-box">
          <div className="functional-panel-box">
            <Header3
              iconName={"fi-rr-stethoscope"}
              contentText={"Rejestracja wizyt"}
            />
            <div className="dropdown">
              <button className="dropbutton">Wybierz specjalizację</button>
              <div className="dropdown-content">
                {Specializations["Specialization"].map(
                  (data, index: number) => {
                    return (
                      <a key={index} onClick={this.handleSpecializationOnClick}>
                        {data}
                      </a>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="results-box">
            {this.state.spinner && <Spinner />}
            {this.state.chosenSpecialization && (
              <SearchConsultationResults
                availableDoctors={this.state.availableDoctors}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
