import React from "react";

import { SearchConsultationResults } from "../../components/SearchConsultationResults/SearchConsultationResults";
import { Spinner } from "../../utils/Spinner/Spinner";
import { Header3 } from "../../utils/h3/Header3";
import "./ScreenCreateConsultation.css";

import Specializations from "../../utils/@Specialization-List.json";
import { DoctorDetails } from "../../utils/shared-types";
const API_URL = process.env.REACT_APP_API_URL;

type ScreenCreateConsultationProps = {};

type ScreenCreateConsultationState = {
  availableDoctors: DoctorDetails[];
  chosenSpecialization: boolean;
  spinner: boolean;
};

export class ScreenCreateConsultation extends React.Component<
  ScreenCreateConsultationProps,
  ScreenCreateConsultationState
> {
  state = {
    availableDoctors: [],
    chosenSpecialization: false,
    spinner: false,
  };

  handleSpecializationOnClick = (event: React.MouseEvent): void => {
    const { innerHTML } = event.target as HTMLDivElement;

    this.setState({ spinner: true });

    var params = { specialization: innerHTML };
    let url = new URLSearchParams(params).toString();
    url = API_URL + "doctors_specialization?" + url;
    let promise = fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    });

    promise.then((response: Response) => {
      response.json().then((data) => {
        const result: DoctorDetails[] = data;
        this.setState({
          availableDoctors: result,
          chosenSpecialization: true,
          spinner: false,
        });
      });
    });
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
                      <div
                        key={index}
                        onClick={this.handleSpecializationOnClick}
                      >
                        {data}
                      </div>
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
