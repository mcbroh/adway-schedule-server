import { ISchema } from "./types";
import readSchema from "./readSchema";
import writeSchema from "./writeSchema";
import schemaToArray from "./schemaToArray";

const updateSchema = async (
  key1: string,
  key2: string
): Promise<{ data?: ISchema[]; error?: string | Error }> => {
  const { data, error } = await readSchema();

  if (error || !data || !data[key1] || !data[key2]) {
    return { error: error || "File not found!" };
  }

  const copyKey1data = { ...data[key1] };
  data[key1].user = data[key2].user;
  data[key2].user = copyKey1data.user;

  const updated = await writeSchema(data);

  if (updated) {
    return { data: schemaToArray(data) };
  }

  return { error: "Could not update schema" };
};

export default updateSchema;
