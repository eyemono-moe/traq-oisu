import {
  bigint,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const lists = mysqlTable("lists", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  title: varchar("title", { length: 128 }).notNull(),
  description: text("description").notNull(),
  visibility: int("visibility").notNull(),
  beginAt: timestamp("begin_at").defaultNow().notNull(),
  endAt: timestamp("end_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const listAdmins = mysqlTable(
  "list_admins",
  {
    listId: bigint("list_id", { mode: "number" }).notNull(),
    userId: varchar("user_id", { length: 128 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.listId, table.userId],
    }),
  }),
);

export const receptions = mysqlTable("receptions", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  listId: bigint("list_id", { mode: "number" }).references(() => lists.id),
  userId: varchar("user_id", { length: 128 }),
  guestName: varchar("guest_name", { length: 128 }),
  eventType: int("event_type").notNull(),
  attendMethod: int("attend_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
