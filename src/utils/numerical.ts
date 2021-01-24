import { DoctorDetails } from "../utils/shared-types";

export let ConvertToUnixTime = (date: string, time: string) => {};

export let generateNextDays = (): Array<{ date: string; display: string }> => {
  let days: Array<Date> = [];
  days[0] = new Date();
  for (let i = 1; i < 6; i++) {
    days[i] = new Date(days[i - 1].getTime() + 1000 * 60 * 60 * 24);
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
      .find((x) => x.user_id == selectedDoctorId.toString())
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

