import {
  bigint,
  char,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/mysql-core";

export const lists = mysqlTable("lists", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  title: char("title").notNull(),
  description: char("description").notNull(),
  visibility: int("visibility").notNull(),
  beginAt: timestamp("begin_at").defaultNow().notNull(),
  endAt: timestamp("end_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});

export const listAdmins = mysqlTable(
  "list_admins",
  {
    id: bigint("id", { mode: "number" }).autoincrement(),
    userId: char("user_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.id, table.userId],
    }),
  }),
);

export const reception = mysqlTable("reception", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  listId: bigint("list_id", { mode: "number" }).references(() => lists.id),
  userId: char("user_id"),
  guestName: char("guest_name"),
  eventType: int("event_type").notNull(),
  attendMethod: int("attend_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});
