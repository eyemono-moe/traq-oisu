import { migrate } from "drizzle-orm/mysql2/migrator";
import { connection, db } from ".";

console.log("Migrating database...");
await migrate(db, { migrationsFolder: "./drizzle" });
await connection.end();
console.log("Migration completed.");
process.exit(0);
