import Elysia from "elysia";

export const receptions = new Elysia({ prefix: "/receptions" })
  .get("/", () => "get receptions")
  .post("/", () => "post receptions");
