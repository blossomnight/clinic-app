import React from "react";
import "./SearchConsultationResults.css";
import { DoctorDetails, ReservedConsultation } from "../../utils/shared-types";
import { ConvertToUnixTime, getAvailableHours } from "../../utils/numerical";

const API_URL = process.env.REACT_APP_API_URL;

type SearchConsultationResultsProps = {
  availableDoctors: DoctorDetails[];
};

type SearchConsultationResultsState = {
  chosenDoctorId: number;
  chosenDate: string;
  chosenTime: string;
};

const AvailableDates: Array<{ date: string; display: string }> = [
  {
    date: "2021.0.17",
    display: "17 styczeń 2021",
  },
  {
    date: "2021.0.18",
    display: "18 styczeń 2021",
  },
  {
    date: "2021.0.19",
    display: "19 styczeń 2021",
  },
  {
    date: "2021.0.20",
    display: "20 styczeń 2021",
  },
  {
    date: "2021.0.21",
    display: "21 styczeń 2021",
  },
];

const ActiveDayHours: Array<string> = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "14:30",
];

export class SearchConsultationResults extends React.Component<
  SearchConsultationResultsProps,
  SearchConsultationResultsState
> {
  state = {
    chosenDoctorId: NaN,
    chosenDate: "",
    chosenTime: "",
  };

  sendConsultationRegisterData = (): void => {
    // fetch(API_URL + "visits", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(bodyData),
    // });
  };

  handleConsultationRegister = (event: React.MouseEvent): void => {
    console.log("Wizyta zarejestrowana");
    //Info, ze udalo się zarejestrować wizytę
    //POST na API z wybranymi danymi

    this.sendConsultationRegisterData();
  };

  handleDoctorClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let doctorId = parseInt(
      event.currentTarget.getAttribute("id")?.toString() as string
    );
    this.setState({
      chosenDoctorId: doctorId,
    });
  };

  handleDateClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let chosenDate: string = event.currentTarget
      .getAttribute("id")
      ?.toString() as string;
    this.setState({
      chosenDate: chosenDate,
    });

    // generateAvailableHours -> Array<{hour: string, available: boolean}>
  };

  render() {
    const activeAvailableButtonClass = "available-button-box chosen";
    const { availableDoctors } = this.props;
    const { chosenDoctorId, chosenDate } = this.state;
    return (
      <div className="search-results-box">
        <div className="results-data">
          <h4>Dostępni lekarze</h4>
          {availableDoctors == [] ?? <span>"Brak dostępnych lekarzy"</span>}
          {availableDoctors.map((doctor) => {
            return (
              <div
                key={doctor.user_id?.toString()}
                id={doctor.user_id?.toString()}
                className={
                  chosenDoctorId ===
                  parseInt(doctor.user_id?.toString() as string)
                    ? activeAvailableButtonClass
                    : "available-button-box"
                }
                onClick={this.handleDoctorClick}
              >
                {doctor.name}
              </div>
            );
          })}
        </div>
        <div className="line"></div>
        <div className="results-data">
          <h4>Dostępne Daty</h4>
          {AvailableDates.map((dates) => {
            return (
              <div
                className={
                  chosenDate === dates.date
                    ? activeAvailableButtonClass
                    : "available-button-box"
                }
                id={dates.date}
                onClick={this.handleDateClick}
              >
                {dates.display}
              </div>
            );
          })}
        </div>
        <div className="line"></div>
        <div className="results-data">
          <h4>Dostępne Godziny</h4>
          {ActiveDayHours.map((hours) => {
            return <div className="available-button-box">{hours}</div>;
          })}
        </div>
        <div className="line"></div>
        <div className="register-button">
          <input
            type="button"
            className="create-consultation button"
            value="Zarezerwuj wizytę"
            onClick={this.handleConsultationRegister}
          />
        </div>
      </div>
    );
  }
}
