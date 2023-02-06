import {
  queryStringJsonSchema,
  response500Schema,
  responseOkSchema,
} from "../schemas/schedule.schema";
import getSchedule from "../utils/getSchedule";
import updateSchema from "../utils/updateSchema";

export const initRoutes = async (server) => {
  server.get(
    "/",
    {
      schema: {
        response: {
          200: responseOkSchema,
        },
      },
    },
    async (request, reply) => {
      const schedule = await getSchedule();

      return { schedule };
    }
  );

  server.post(
    "/:key1/:key2",
    {
      schema: {
        params: queryStringJsonSchema,
        response: {
          200: responseOkSchema,
          500: response500Schema,
        },
      },
    },
    async (request, reply) => {
      const { data, error } = await updateSchema(
        request.params.key1,
        request.params.key2
      );

      if (data) {
        return reply.send({ schedule: data });
      }

      return reply.status(500).send({ error: error });
    }
  );
};
