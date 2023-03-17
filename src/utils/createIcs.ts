import { createEvents, EventAttributes } from "ics";
import { ISchema } from "./types";

const createIcs = (filteredSchedule: ISchema[]) => {
  const events = filteredSchedule.map((x) => {
    const date = new Date(x.date);
    return {
      calName: "Support days",
      title: "On Support",
      start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0],
      end: [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1, 0, 0],
    };
  }) as EventAttributes[];

  const { error, value } = createEvents(events);
  return { error, value };
};

export default createIcs;
