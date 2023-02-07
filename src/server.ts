import express from "express";
import getSchedule from "./utils/getSchedule";
import updateSchema from "./utils/updateSchema";

const app = express();
app.get("/", async (req, res) => {
  const schedule = await getSchedule();

  res.send({ schedule });
});

app.post("/:key1/:key2", async (request, response) => {
  const { data, error } = await updateSchema(
    request.params.key1,
    request.params.key2
  );

  if (data) {
    return response.send({ schedule: data });
  }

  return response.status(500).send({ error: error });
});

const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT);
