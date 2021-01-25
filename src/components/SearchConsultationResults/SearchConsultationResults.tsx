import React from "react";
import "./SearchConsultationResults.css";
import { DoctorDetails } from "../../utils/shared-types";
import {
  generateNextDays,
  getAvailableHours,
  toEpochTime,
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

  sendConsultationRegisterData = (): void => {
    console.log(this.state);
    const bodyData = {
      doctor_id: this.state.selectedDoctorId,
      date: toEpochTime(this.state.selectedDate, this.state.selectedHour),
      user_id: Number.parseInt(localStorage.getItem("user_id") ?? "0"),
    };
    const body = JSON.stringify(bodyData);
    console.log(body);
    fetch(API_URL + "visits", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then((response: Response) => {
      console.log(response);
      if (response.ok) {
        alert("Poprawnie zarejestrowano wizytę");
        this.props.availableDoctors
          .find(
            (doc) =>
              Number.parseInt(doc.user_id ?? "0") ===
              this.state.selectedDoctorId
          )
          ?.visits.push({ date: bodyData.date.toString() });
        this.setState({
          activeDayHours:  getAvailableHours(
            this.state.selectedDoctorId,
            this.state.selectedDate,
            this.props.availableDoctors
          ),
        });
      } else {
        alert("Nie udało się zarejestrować wizyty");
      }
    });
  };

  handleConsultationRegister = (event: React.MouseEvent): void => {
    if (
      isNaN(this.state.selectedDoctorId) ||
      this.state.selectedDate === "" ||
      this.state.selectedHour === ""
    ) {
      alert("Zaznacz wszystkie potrzebne informacje");
      return;
    }
    //Info, ze udalo się zarejestrować wizytę
    //POST na API z wybranymi danymi
    this.sendConsultationRegisterData();
  };

  handleDoctorClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let doctorId = parseInt(
      event.currentTarget.getAttribute("id")?.toString() as string
    );
    if (this.state.selectedDoctorId === doctorId) return; // Nic się nie zmieniło, można wyjść z funkcji
    this.setState({
      selectedDoctorId: doctorId,
      selectedDate: "",
      selectedHour: "",
      shouldLoadDates: true,
      shouldLoadHours: false,
    });
  };

  handleDateClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    let selectedDate: string = event.currentTarget.getAttribute("id") as string;

    const activeDayHours: Array<{
      hour: string;
      available: boolean;
    }> = getAvailableHours(
      this.state.selectedDoctorId,
      selectedDate,
      this.props.availableDoctors
    );

    this.setState({
      selectedDate: selectedDate,
      shouldLoadHours: true,
      activeDayHours: activeDayHours,
    });
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
    const unavailableButtonClass = "available-button-box non-available";
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
          {availableDoctors.length === 0 ?? (
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
            {generateNextDays(5).map((dates, index) => {
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
                    hour.available
                      ? selectedHour === hour.hour
                        ? activeAvailableButtonClass
                        : "available-button-box"
                      : unavailableButtonClass
                  }
                  onClick={hour.available ? this.handleHourClick : () => {}}
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
