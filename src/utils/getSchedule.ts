import dayjs from "dayjs";
import readXlsxFile from "read-excel-file/node";

import { ISchema, TSchemaData } from "./types";
import readSchema from "./readSchema";
import fetchHolidays from "./fetchHolidays";
import { schemaXlsxPath } from "./constants";
import writeSchema from "./writeSchema";
import schemaToArray from "./schemaToArray";

const getSchedule = async (): Promise<Array<ISchema>> => {
  const holidays = await fetchHolidays(dayjs().format("YYYY"));

  const { data } = await readSchema();

  if (data) {
    return schemaToArray(data);
  }

  const schedule = (await readXlsxFile(schemaXlsxPath, {
    sheet: "Schedule 2023",
  })
    .then((rows) => {
      const users = new Set();
      rows.forEach((row, index) => {
        if (
          index + 1 >= 16 &&
          row[0] !== null &&
          row[0] !== "Responsible person"
        ) {
          users.add(row[0]);
        }
      });
      const usersArray = Array.from(users);
      const today = new Date();
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      const days = {};
      let userIndex = 0;

      for (
        let d = new Date("2023-01-16T19:31:09.284Z");
        d <= endOfYear;
        d.setDate(d.getDate() + 1)
      ) {
        const holiday = holidays.find(({ date }) => {
          return (
            dayjs(date).format("YYYY-MM-DD") === dayjs(d).format("YYYY-MM-DD")
          );
        });
        

        const isSaturday = d.getDay() === 6;
        const isRedDay = d.getDay() ===  0 || holiday;

        days[dayjs(d).format("YYYYMMDD")] = {
          date: new Date(d),
          isHoliday: isRedDay,
          restDay: isRedDay || isSaturday,
          user:
            isRedDay || isSaturday
              ? null
              : usersArray[userIndex++ % usersArray.length],
        };
      }

      return days;
    })
    .catch((err) => {
      console.log(err);
    })) as TSchemaData;

  await writeSchema(schedule);

  return schemaToArray(schedule);
};

export default getSchedule;
