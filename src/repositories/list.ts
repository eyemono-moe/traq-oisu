import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { lists } from "../db/schema";

const insertSchema = createInsertSchema(lists);

const listCreateBody = t.Omit(insertSchema, ["id", "createdAt", "updatedAt"]);
const listReadParams = t.Object({
  listId: t.String(),
});
const listUpdateParams = t.Object({
  listId: t.String(),
});
const listUpdateBody = t.Omit(t.Partial(insertSchema), [
  "id",
  "createdAt",
  "updatedAt",
]);
const listDeleteParams = t.Object({
  listId: t.String(),
});

export const listModel = new Elysia().model({
  listCreateBody,
  listReadParams,
  listUpdateParams,
  listUpdateBody,
  listDeleteParams,
});

export const listRepository = {
  readAll: async () => {
    return await db.select().from(lists);
  },
  create: (body: typeof listCreateBody.static) => {
    return db.insert(lists).values(body);
  },
  read: async (params: typeof listReadParams.static) => {
    const id = Number(params.listId);
    const result = await db
      .select()
      .from(lists)
      .where(eq(lists.id, id))
      .limit(1);
    return result.at(0);
  },
  update: async (
    params: typeof listUpdateParams.static,
    body: typeof listUpdateBody.static,
  ) => {
    const id = Number(params.listId);
    const result = await db.update(lists).set(body).where(eq(lists.id, id));
    const insertedId = result[0]?.insertId;
    return (await db.select().from(lists).where(eq(lists.id, insertedId))).at(
      0,
    );
  },
  delete: (params: typeof listDeleteParams.static) => {
    // TODO: 物理削除ではなく論理削除にする
    const id = Number(params.listId);
    return db.delete(lists).where(eq(lists.id, id));
  },
};
