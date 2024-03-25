import Elysia, { NotFoundError } from "elysia";
import { listModel, listRepository } from "../../../repositories/list";

export const lists = new Elysia({ prefix: "/lists" })
  .use(listModel)
  .get("/", ({ body }) => listRepository.readAll(body), {
    body: "readAllBody",
  })
  .post("/", ({ body }) => listRepository.create(body), {
    body: "createBody",
  })
  .get("/:id", async ({ params }) => {
    const res = await listRepository.read(params);
    if (!res) {
      throw new NotFoundError("Not Found");
    }
    return res;
  });
