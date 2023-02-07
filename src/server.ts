const HTTP_PORT = process.env.PORT || 8080;
import cors from "@fastify/cors";
import Fastify from "fastify";

import { initRoutes } from "./router/schemaRoutes";

export const server = Fastify();
/* import express from "express";


const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(HTTP_PORT); */

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})


const start = async () => {
  // await server.register(cors);
  // routes must be initiated last
  // await initRoutes(server);

  try {
    await server.listen({ port: 8080 });

    console.log(`Server ready on port ${HTTP_PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
