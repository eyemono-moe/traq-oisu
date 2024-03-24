import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

export const connection = await mysql.createConnection({
  host: process.env.NS_MARIADB_HOSTNAME,
  user: process.env.NS_MARIADB_USER,
  password: process.env.NS_MARIADB_PASSWORD,
  database: process.env.NS_MARIADB_DATABASE,
  port: Number.parseInt(process.env.NS_MARIADB_PORT ?? "3306"),
  multipleStatements: true,
});

export const db = drizzle(connection, { schema, mode: "default" });
