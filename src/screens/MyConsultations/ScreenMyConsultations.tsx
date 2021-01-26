import React from "react";
import "./ScreenMyConsultations.css";
import { ListingContainer } from "../../components/ListingContainer/ListingContainer";
import { ReservedConsultation } from "../../utils/shared-types";
import { fromEpochTime } from "../../utils/numerical";

const API_URL = process.env.REACT_APP_API_URL;

const visitToStringArray = (visit: ReservedConsultation): Array<string> => {
  return [fromEpochTime(visit.date), visit.doctor_name, visit.specialization];
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
    visits: Array<ReservedConsultation>(),
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
        this.setState({ visits: data });
      });
    });
  }

  removeVisit(index: number) {
    let id = this.state.visits[index].id;
    console.log("removing visit id", id);
    fetch(API_URL + "visits/" + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response: Response) => {
      console.log(response);
    });
    this.setState({
      visits: this.state.visits.filter((visit) => visit.id !== id),
    });
    alert("Poprawnie zrezygnowano z wizyty");
  }

  render() {
    return (
      <div className="screen consultations">
        <ListingContainer
          mainData={this.state.visits
            .sort((v1, v2) => v1.date - v2.date)
            .map((visit) => visitToStringArray(visit))}
          headers={["Data", "Lekarz", "Specjalizacja"]}
          buttonText={"Zrezygnuj"}
          buttonCallback={this.removeVisit.bind(this)}
        />
      </div>
    );
  }
}
