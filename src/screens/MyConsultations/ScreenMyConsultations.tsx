import React from "react";
import "./ScreenMyConsultations.css";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import { ReservedConsultation } from "../../utils/shared-types";

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
export class ScreenMyConsultations extends React.Component {
  componentDidMount() {
    const bodyData = {
      token: localStorage.getItem("token"),
    };
    fetch(API_URL + "details", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorize: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res: Response) => console.log(res));
  }

  render() {
    return (
      <div className="screen consultations">
        {"Cąsultaciąs"}
        <ListingContainer />
      </div>
    );
  }
}
