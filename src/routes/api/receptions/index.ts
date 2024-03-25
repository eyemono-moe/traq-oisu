import Elysia from "elysia";
import {
  receptionModel,
  receptionRepository,
} from "../../../repositories/reception";

export const receptions = new Elysia({})
  .use(receptionModel)
  .group("/list/:listId/receptions", (app) =>
    app
      .get("/", ({ params }) => receptionRepository.readAll(params), {
        params: "receptionReadFromListParams",
        detail: {
          tags: ["receptions", "lists"],
          description: "Get all receptions from a list",
          responses: {
            200: {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/reception",
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
          return receptionRepository.create(body);
        },
        {
          body: "receptionCreateBody",
          detail: {
            tags: ["receptions", "lists"],
            description: "Create a reception",
            responses: {
              201: {
                description: "Created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/reception",
                    },
                  },
                },
              },
            },
          },
        },
      ),
  )
  .group("receptions/:receptionId", (app) =>
    app
      .get(
        "/",
        async ({ params, error }) => {
          const res = await receptionRepository.read(params);
          if (!res) {
            return error(404);
          }
          return res;
        },
        {
          params: "receptionReadParams",
          detail: {
            tags: ["receptions"],
            description: "Get a reception",
            responses: {
              200: {
                description: "Success",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/reception",
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
      .put(
        "/",
        ({ params, body }) => receptionRepository.update(params, body),
        {
          params: "receptionUpdateParams",
          body: "receptionUpdateBody",
          detail: {
            tags: ["receptions"],
            description: "Update a reception",
            responses: {
              200: {
                description: "Success",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/reception",
                    },
                  },
                },
              },
            },
          },
        },
      )
      .delete("/", ({ params }) => receptionRepository.delete(params), {
        params: "receptionDeleteParams",
        detail: {
          tags: ["receptions"],
          description: "Delete a reception",
          responses: {
            204: {
              description: "No Content",
            },
          },
        },
      }),
  );
