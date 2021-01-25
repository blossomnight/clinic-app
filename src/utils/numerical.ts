import { DoctorDetails } from "../utils/shared-types";

export let generateNextDays = (nof_days: number): Array<{ date: string; display: string }> => {
  let days: Array<Date> = [];
  days[0] = new Date();
  for (let i = 0; i < nof_days; i++) {
    days[i + 1] = new Date(days[i].getTime() + 1000 * 60 * 60 * 24);
  }
  return days.slice(1).map((d) => {
    return {
      date: `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`,
      display: `${d.getDate()} ${d.toLocaleString("default", {
        month: "long",
      })} ${d.getFullYear()}`,
    };
  });
};

export const ActiveDayHours: Array<string> = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "14:30",
  "15:00",
  "15:30",
];

export let getAvailableHours = (
  selectedDoctorId: number,
  selectedDate: string, // "rrrr.mm.dd"
  json: Array<DoctorDetails>
): Array<{ hour: string, available: boolean }> => {
  const visits =
    json
      .find((x) => x.user_id === selectedDoctorId.toString())
      ?.visits.map((v) => v.date) ?? [];

  const availableVisits = ActiveDayHours.map((str) => {
    return { hour: str, epoch: Date.parse(selectedDate + " " + str) };
  }).map((obj) => {
    return {
      hour: obj.hour,
      available: !visits.includes(obj.epoch.toString()),
    };
  });
  return availableVisits;
};

export let toEpochTime = (
  date: string,
  hour: string
): number => {
  return Date.parse(date + " " + hour);
}

export let fromEpochTime = (epoch: number): string => {
  const date = new Date(epoch);
  date.setTime(epoch);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const result = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  return result;
}