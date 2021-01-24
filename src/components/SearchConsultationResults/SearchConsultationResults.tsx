import React from "react";
import "./SearchConsultationResults.css";
import { DoctorDetails, ReservedConsultation } from "../../utils/shared-types";
import { ConvertToUnixTime, getAvailableHours } from "../../utils/numerical";

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
    activeDayHours: [{ hour: "", available: true }],
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
    alert("Wizyta zarejestrowana");
    //Info, ze udalo się zarejestrować wizytę
    //POST na API z wybranymi danymi

    this.sendConsultationRegisterData();
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

    console.log(selectedDate);
    console.log(activeDayHours);
    //wywala tu apke
    this.setState({
      selectedDate: selectedDate,
      shouldLoadHours: true,
      activeDayHours: activeDayHours,
    });

    // potem wyswietlac jeszcze te niedostepne jako wyszarzone

    // generateAvailableHours -> Array<{hour: string, available: boolean}>
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
          {availableDoctors == [] ?? <span>"Brak dostępnych lekarzy"</span>}
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
                    hour.available
                      ? selectedHour === hour.hour
                        ? activeAvailableButtonClass
                        : "available-button-box"
                      : unavailableButtonClass
                  }
                  onClick={hour.available ? this.handleHourClick : () => { }}
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
