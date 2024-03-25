import { Elysia } from "elysia";
import { routes } from "./routes";
import { swaggerOptions } from "./swagger";

const app = new Elysia()
  .onError(({ body, params, query }) => {
    console.error({ body, params, query });
  })
  .use(swaggerOptions)
  .use(routes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
