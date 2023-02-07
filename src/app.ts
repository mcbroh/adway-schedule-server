import cors from "@fastify/cors";
import Fastify from "fastify";

import { initRoutes } from "./router/schemaRoutes";

export const server = Fastify();

async function main() {
  await server.register(cors);
  // routes must be initiated last
  await initRoutes(server);

  try {
    const port = process.env.PORT || 8080;
    await server.listen({ port: 8080 });

    console.log(`Server ready on port ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
