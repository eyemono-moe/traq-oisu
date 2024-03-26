import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { listAdmins, lists } from "../db/schema";

const listsSchema = createInsertSchema(lists);
const insertSchema = t.Omit(listsSchema, ["id", "createdAt", "updatedAt"]);
const adminSchema = createInsertSchema(listAdmins);
export const insertSchemaWithAdmins = t.Intersect([
  insertSchema,
  t.Object({
    admins: t.Array(t.Omit(adminSchema, ["listId"]), { minItems: 1 }),
  }),
]);

const listCreateBody = insertSchemaWithAdmins;
const listReadParams = t.Object({
  listId: t.String(),
});
const listUpdateParams = t.Object({
  listId: t.String(),
});
const listUpdateBody = t.Partial(insertSchemaWithAdmins);
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
    console.log(
      db.query.lists
        .findMany({
          with: {
            admins: {
              columns: {
                userId: true,
              },
            },
          },
        })
        .toSQL(),
    );
    return await db.query.lists.findMany({
      with: {
        admins: {
          columns: {
            userId: true,
          },
        },
      },
    });
  },
  create: (body: typeof listCreateBody.static) => {
    const { admins, ...list } = body;

    return db.transaction(async (tx) => {
      const result = await tx.insert(lists).values(list);
      const insertedId = result[0]?.insertId;

      await tx.insert(listAdmins).values(
        admins.map((admin) => ({
          listId: insertedId,
          ...admin,
        })),
      );

      return await tx.query.lists.findFirst({
        where: eq(lists.id, insertedId),
        with: {
          admins: {
            columns: {
              userId: true,
            },
          },
        },
      });
    });
  },
  read: async (params: typeof listReadParams.static) => {
    const id = Number(params.listId);
    const result = await db.query.lists.findFirst({
      where: eq(lists.id, id),
      with: {
        admins: {
          columns: {
            userId: true,
          },
        },
      },
    });
    return result;
  },
  update: async (
    params: typeof listUpdateParams.static,
    body: typeof listUpdateBody.static,
  ) => {
    const id = Number(params.listId);
    const { admins, ...list } = body;
    return db.transaction(async (tx) => {
      await tx.update(lists).set(list).where(eq(lists.id, id));
      if (admins) {
        await tx.delete(listAdmins).where(eq(listAdmins.listId, id));
        await tx.insert(listAdmins).values(
          admins.map((admin) => ({
            listId: id,
            ...admin,
          })),
        );
      }

      return await tx.query.lists.findFirst({
        where: eq(lists.id, id),
        with: {
          admins: {
            columns: {
              userId: true,
            },
          },
        },
      });
    });
  },
  delete: (params: typeof listDeleteParams.static) => {
    // TODO: 物理削除ではなく論理削除にする
    const id = Number(params.listId);
    return db.delete(lists).where(eq(lists.id, id));
  },
};
