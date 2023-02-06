import fetch from "node-fetch";

const fetchHolidays = (
  year
): Promise<
  {
    date: string;
    localName: string;
    type: "Public";
  }[]
> => {
  return fetch(
    `https://date.nager.at/api/v2/publicholidays/${year}/SE`,
    {}
  ).then((res: any) => res.json());
};

export default fetchHolidays;
