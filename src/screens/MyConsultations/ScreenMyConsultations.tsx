import React from "react";
import "./ScreenMyConsultations.css";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import { ReservedConsultation } from "../../utils/shared-types";
import { fromEpochTime } from "../../utils/numerical";

const API_URL = process.env.REACT_APP_API_URL;

const Visits: Array<ReservedConsultation> = [
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
  {
    date: "1611504824",
    doctor_id: 2,
    specialization: "Okulista",
    doctor_name: "NAME",
  },
];

let visitToStringArray = (visit: ReservedConsultation): Array<string> => {
  return [
    fromEpochTime(Number.parseInt(visit.date)),
    visit.doctor_name,
    visit.specialization,
  ];
};

type ScreenMyConsultationsProps = {};

type ScreenMyConsultationsState = {
  visits: Array<ReservedConsultation>;
};

export class ScreenMyConsultations extends React.Component<
  ScreenMyConsultationsProps,
  ScreenMyConsultationsState
> {
  state = {
    visits: Visits,
  };

  componentDidMount() {
    let id = localStorage.getItem("user_id") ?? "";
    fetch(API_URL + "visits?user_id=" + id, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response: Response) => {
      response.json().then((data) => {
        console.log(data);
        this.setState({ visits: data });
        console.log("Visists set");
      });
      // Load visits into this.state.visits
    });
  }

  render() {
    return (
      <div className="screen consultations">
        <ListingContainer
          mainData={this.state.visits.map((visit) => visitToStringArray(visit))}
          headers={["Data", "Lekarz", "Specjalizacja"]}
        />
      </div>
    );
  }
}
