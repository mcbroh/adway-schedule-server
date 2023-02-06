import { readFileSync } from "fs";

import { IUpdateReadResponse } from "./types";
import { schemaFilePath } from "./constants";

const readSchema = async (): Promise<IUpdateReadResponse> => {
  return new Promise(async (resolve) => {
    try {
      const file = await readFileSync(schemaFilePath, "utf-8");
      resolve({ data: JSON.parse(file) as IUpdateReadResponse["data"] });
    } catch (error) {
      resolve({ error: error || "File not found!" });
    }
  });
};

export default readSchema;
