import cors from "cors";
import express from "express";

import getSchedule from "./utils/getSchedule";
import swapSupportResponsible from "./utils/swapSupportResponsible";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const schedule = await getSchedule();

  res.send({ schedule });
});

app.post("/:key1/:key2", async (request, response) => {
  try {
    const updatedSchedule = await swapSupportResponsible(
      request.params.key1,
      request.params.key2
    );

    return response.send({ schedule: updatedSchedule });
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
});

const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT);
