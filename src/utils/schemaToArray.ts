import { TSchemaData, ISchema } from "./types";

const schemaToArray = (arg: TSchemaData): Array<ISchema> => {
  return Object.keys(arg).map((key) => ({
    ...arg[key],
    id: key,
  }));
};

export default schemaToArray;
