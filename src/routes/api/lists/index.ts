import Elysia, { NotFoundError } from "elysia";
import { listModel, listRepository } from "../../../repositories/list";

export const lists = new Elysia({ prefix: "/lists" })
  .use(listModel)
  .get("/", () => listRepository.readAll(), {
    detail: {
      tags: ["lists"],
      description: "Get all lists",
      responses: {
        200: {
          description: "Lists",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/list",
                },
              },
            },
          },
        },
      },
    },
  })
  .post(
    "/",
    ({ body }) => {
      return listRepository.create(body);
    },
    {
      body: "listCreateBody",
      detail: {
        tags: ["lists"],
        description: "Create a list",
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/list",
                },
              },
            },
          },
        },
      },
    },
  )
  .get(
    "/:listId",
    async ({ params }) => {
      const res = await listRepository.read(params);
      if (!res) {
        throw new NotFoundError("Not Found");
      }
      return res;
    },
    {
      params: "listReadParams",
      detail: {
        tags: ["lists"],
        description: "Get a list",
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/list",
                },
              },
            },
          },
          404: {
            description: "Not Found",
          },
        },
      },
    },
  )
  .put("/:listId", ({ params, body }) => listRepository.update(params, body), {
    params: "listUpdateParams",
    body: "listUpdateBody",
    detail: {
      tags: ["lists"],
      description: "Update a list",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/list",
              },
            },
          },
        },
      },
    },
  })
  .delete("/:listId", ({ params }) => listRepository.delete(params), {
    params: "listDeleteParams",
    detail: {
      tags: ["lists"],
      description: "Delete a list",
      responses: {
        204: {
          description: "No Content",
        },
      },
    },
  });
