import { writeFileSync } from "fs";

import { TSchemaData } from "./types";
import { schemaFilePath } from "./constants";

const writeSchema = async (arg: TSchemaData): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      await writeFileSync(schemaFilePath, JSON.stringify(arg, null, 2));
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
};

export default writeSchema;
