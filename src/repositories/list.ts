import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { lists } from "../db/schema";

const insertSchema = createInsertSchema(lists);
const selectSchema = createSelectSchema(lists);

const readParams = t.Object({
  id: t.String(),
});
const readAllBody = t.MaybeEmpty(
  t.Object({
    limit: t.Optional(t.Integer()),
    offset: t.Optional(t.Integer()),
  }),
);
const createBody = t.Omit(insertSchema, ["id", "createdAt", "updatedAt"]);
const updateBody = t.Intersect([
  t.Partial(insertSchema),
  t.Partial(t.Object({ id: selectSchema.properties.id })),
]);
const deleteBody = t.Object({
  id: selectSchema.properties.id,
});

export const listModel = new Elysia().model({
  readParams,
  readAllBody,
  createBody,
  updateBody,
  deleteBody,
});

export const listRepository = {
  read: async (params: typeof readParams.static) => {
    const id = Number(params.id);
    const result = await db.select().from(lists).where(eq(lists.id, id));
    return result.at(0);
  },
  readAll: async (body: typeof readAllBody.static) => {
    return await db
      .select()
      .from(lists)
      .limit(body?.limit ?? 100)
      .offset(body?.offset ?? 0);
  },
  create: async (body: typeof createBody.static) => {
    const result = await db.insert(lists).values(body);
    console.log(result);
  },
  update: (body: typeof updateBody.static) => {},
  delete: (body: typeof deleteBody.static) => {},
};
