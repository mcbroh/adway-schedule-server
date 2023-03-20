import fetch from "node-fetch";
import { ISchema } from "./types";
import getSchedule from "./getSchedule";

const swapSupportResponsible = async (
  day1: string,
  day2: string
): Promise<ISchema[]> => {
  const schedule = await getSchedule();
  const scheduleEntryForDay1 = schedule.find(
    (scheduleEntry) => scheduleEntry.date === day1
  );
  const scheduleEntryForDay2 = schedule.find(
    (scheduleEntry) => scheduleEntry.date === day2
  );

  if (!scheduleEntryForDay1 || !scheduleEntryForDay2) {
    throw new Error(
      "Could not find support responsible for the specified dates"
    );
  }

  await overrideSupportResponsible(
    scheduleEntryForDay1.date,
    scheduleEntryForDay2.user
  );
  await overrideSupportResponsible(
    scheduleEntryForDay2.date,
    scheduleEntryForDay1.user
  );

  return getSchedule();
};

const overrideSupportResponsible = async (date: string, resource: string) => {
  const overrideResponse = await fetch(
    "https://wer2qlkhg9.execute-api.eu-north-1.amazonaws.com/override",
    {
      body: JSON.stringify({
        resource,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  if (!overrideResponse.ok) {
    throw new Error("Failed to override support responsible");
  }
};

export default swapSupportResponsible;
