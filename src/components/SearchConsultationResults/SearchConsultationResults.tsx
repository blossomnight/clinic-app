import React from "react";
import "./SearchConsultationResults.css";
import { DoctorDetails, ReservedConsultation } from "../../utils/shared-types";
import {
  ConvertToUnixTime,
  getAvailableHours,
  generateNextDays,
} from "../../utils/numerical";

const API_URL = process.env.REACT_APP_API_URL;

type SearchConsultationResultsProps = {
  availableDoctors: DoctorDetails[];
};

type SearchConsultationResultsState = {
  selectedDoctorId: number;
  selectedDate: string;
  selectedHour: string;
  shouldLoadHours: boolean;
  shouldLoadDates: boolean;
  activeDayHours: Array<{ hour: string; available: boolean }>;
};

const AvailableDates: Array<{
  date: string;
  display: string;
}> = generateNextDays();

export class SearchConsultationResults extends React.Component<
  SearchConsultationResultsProps,
  SearchConsultationResultsState
> {
  state = {
    selectedDoctorId: NaN,
    selectedDate: "",
    selectedHour: "",
    shouldLoadHours: false,
    shouldLoadDates: false,
    activeDayHours: [{ hour: "", available: false }],
  };

  sendConsultationRegisterData = (): void => {};

  handleConsultationRegister = (event: React.MouseEvent): void => {
    alert("Wizyta zarejestrowana");

    const bodyData = {
      doctor_id: this.state.selectedDoctorId.toString(),
      date: 1611658845,
      user_id: localStorage.getItem("userId"),
    };
    const token = "Bearer " + localStorage.getItem("token");
    console.log(bodyData);
    fetch(API_URL + "visits", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then((res: Response) => console.log(res));
  };

  handleDoctorClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let doctorId = parseInt(
      event.currentTarget.getAttribute("id")?.toString() as string
    );
    this.setState({
      selectedDoctorId: doctorId,
      shouldLoadDates: true,
    });
  };

  handleDateClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let selectedDate: string = event.currentTarget.getAttribute("id") as string;

    const activeDayHours: Array<{
      hour: string;
      available: boolean;
    }> = getAvailableHours(
      this.state.selectedDoctorId,
      this.state.selectedDate,
      this.props.availableDoctors
    );

    console.log(activeDayHours);
    // BLAD - zwraca wszystkie jako available: true

    this.setState({
      selectedDate: selectedDate,
      shouldLoadHours: true,
      activeDayHours: activeDayHours,
    });

    // potem wyswietlac jeszcze te niedostepne jako wyszarzone
  };

  handleHourClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let selectedHour: string = event.currentTarget.getAttribute("id") as string;
    this.setState({
      selectedHour: selectedHour,
    });
    console.log();
  };

  render() {
    const activeAvailableButtonClass = "available-button-box chosen";
    const { availableDoctors } = this.props;
    const {
      selectedDoctorId,
      selectedDate,
      selectedHour,
      shouldLoadHours,
      shouldLoadDates,
    } = this.state;

    return (
      <div className="search-results-box">
        <div className="results-data">
          <h4>Dostępni lekarze</h4>
          {availableDoctors.length == 0 ?? (
            <span>"Brak dostępnych lekarzy"</span>
          )}
          {availableDoctors.map((doctor, index) => {
            return (
              <div
                key={index}
                id={doctor.user_id?.toString()}
                className={
                  selectedDoctorId ===
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
        {shouldLoadDates && (
          <div className="results-data">
            <h4>Dostępne Daty</h4>
            {AvailableDates.map((dates, index) => {
              return (
                <div
                  className={
                    selectedDate === dates.date
                      ? activeAvailableButtonClass
                      : "available-button-box"
                  }
                  key={index}
                  id={dates.date}
                  onClick={this.handleDateClick}
                >
                  {dates.display}
                </div>
              );
            })}
          </div>
        )}
        <div className="line"></div>
        {shouldLoadHours && (
          <div className="results-data">
            <h4>Dostępne Godziny</h4>
            {this.state.activeDayHours.map((hour, index) => {
              return (
                <div
                  key={index}
                  id={hour.hour}
                  className={
                    selectedHour === hour.hour
                      ? activeAvailableButtonClass
                      : "available-button-box" && hour.available
                      ? "available-button-box"
                      : "available-button-box non-available"
                  }
                  onClick={this.handleHourClick}
                >
                  {hour.hour}
                </div>
              );
            })}
          </div>
        )}
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
