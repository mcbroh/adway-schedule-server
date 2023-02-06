import cors from "@fastify/cors";
import Fastify from "fastify";

import { initRoutes } from "./router/schemaRoutes";
import getSchedule from "./utils/getSchedule";

export const server = Fastify();

async function main() {
  // routes must be initiated last
  await initRoutes(server);
  await server.register(cors);

  try {
    const port = process.env.PORT || 8080;
    await server.listen({ port: 8080 });

    const schedule = await getSchedule();
    console.log(schedule);
    
    console.log(`Server ready on port ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
