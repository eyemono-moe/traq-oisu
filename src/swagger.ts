import swagger from "@elysiajs/swagger";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { listAdmins, lists, receptions } from "./db/schema";

const listSchema = createSelectSchema(lists);
const adminSchema = createInsertSchema(listAdmins);
const listWithAdminSchema = t.Intersect([
  t.Omit(listSchema, ["id", "createdAt", "updatedAt"]),
  t.Object({
    admins: t.Array(t.Omit(adminSchema, ["listId"]), { minItems: 1 }),
  }),
]);

export const swaggerOptions = swagger({
  documentation: {
    tags: [
      {
        name: "lists",
        description: "Lists API",
      },
      {
        name: "receptions",
        description: "Receptions API",
      },
    ],
    components: {
      schemas: {
        list: listWithAdminSchema,
        reception: createSelectSchema(receptions),
      },
    },
  },
});
