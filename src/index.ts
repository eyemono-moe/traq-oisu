import { Elysia } from "elysia";
import { routes } from "./routes";
import { swaggerOptions } from "./swagger";

const app = new Elysia()
  .onError(({ body, params, query, code, path, error }) => {
    console.error(`error on ${path}:`, { body, params, query });
    console.log(`code: ${code}`, error.message);
  })
  .use(swaggerOptions)
  .use(routes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
