import React from "react";
import "./ScreenMyConsultations.css";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import { ReservedConsultation } from "../../utils/shared-types";
import { fromEpochTime } from "../../utils/numerical";

const API_URL = process.env.REACT_APP_API_URL;

const Visits: Array<ReservedConsultation> = [
  {
    id: 3,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
  {
    id: 4,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
  {
    id: 5,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
  {
    id: 6,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
  {
    id: 7,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
  {
    id: 8,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
  {
    id: 9,
    date: "1611504824",
    doctor_id: 2,
    user_id: 1,
    specialization: "Okulista",
  },
];

let visitToStringArray = (visit: ReservedConsultation): Array<string> => {
  return [fromEpochTime(Number.parseInt(visit.date)), visit.specialization];
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
    fetch(API_URL + "details", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorize: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res: Response) => {
      console.log(res);
      // Load visits into this.state.visits
    });
  }

  render() {
    return (
      <div className="screen consultations">
        <ListingContainer
          mainData={this.state.visits.map((visit) => visitToStringArray(visit))}
          headers={["Data", "Specjalista"]}
        />
      </div>
    );
  }
}
