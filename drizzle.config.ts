import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "localhost",
    user: process.env.NS_MARIADB_USER,
    password: process.env.NS_MARIADB_PASSWORD,
    database: process.env.NS_MARIADB_DATABASE ?? "oisu",
    port: Number.parseInt(process.env.NS_MARIADB_PORT ?? "3306"),
  },
  verbose: true,
  strict: true,
} satisfies Config;
