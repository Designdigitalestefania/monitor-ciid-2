import { buildApp } from "./server/app.js";
import { env } from "./config/env.js";

async function start() {
  const app = await buildApp();
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    app.log.info(`API en puerto ${env.PORT}`);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

start();
