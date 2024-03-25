import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { receptions } from "../db/schema";

const insertSchema = createInsertSchema(receptions);

const receptionReadFromListParams = t.Object({
  listId: t.String(),
});
const receptionCreateBody = t.Omit(insertSchema, [
  "id",
  "listId",
  "createdAt",
  "updatedAt",
]);
const receptionReadParams = t.Object({
  id: t.String(),
});
const receptionUpdateParams = t.Object({
  id: t.String(),
});
const receptionUpdateBody = t.Omit(t.Partial(insertSchema), [
  "id",
  "listId",
  "createdAt",
  "updatedAt",
]);
const receptionDeleteParams = t.Object({
  id: t.String(),
});

export const receptionModel = new Elysia().model({
  receptionReadFromListParams,
  receptionCreateBody,
  receptionReadParams,
  receptionUpdateParams,
  receptionUpdateBody,
  receptionDeleteParams,
});

export const receptionRepository = {
  readAll: async (params: typeof receptionReadFromListParams.static) => {
    const listId = Number(params.listId);
    return await db
      .select()
      .from(receptions)
      .where(eq(receptions.listId, listId));
  },
  create: (body: typeof receptionCreateBody.static) => {
    return db.insert(receptions).values(body);
  },
  read: async (params: typeof receptionReadParams.static) => {
    const id = Number(params.id);
    const result = await db
      .select()
      .from(receptions)
      .where(eq(receptions.id, id))
      .limit(1);
    return result.at(0);
  },
  update: async (
    params: typeof receptionUpdateParams.static,
    body: typeof receptionUpdateBody.static,
  ) => {
    const id = Number(params.id);
    const result = await db
      .update(receptions)
      .set(body)
      .where(eq(receptions.id, id));
    const insertedId = result[0]?.insertId;
    return (
      await db
        .select()
        .from(receptions)
        .where(eq(receptions.id, insertedId))
        .limit(1)
    ).at(0);
  },
  delete: (params: typeof receptionDeleteParams.static) => {
    // TODO: 物理削除ではなく論理削除にする
    const id = Number(params.id);
    return db.delete(receptions).where(eq(receptions.id, id));
  },
};
