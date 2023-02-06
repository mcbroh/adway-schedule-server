export const responseOkSchema = {
  type: "object",
  properties: {
    schedule: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          user: { type: "string" },
          date: { type: "string" },
          isHoliday: { type: "boolean" },
          restDay: { type: "boolean" },
        },
      },
    },
  },
};

export const response500Schema = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export const queryStringJsonSchema = {
  key1: { type: "string" },
  key2: { type: "string" },
};
