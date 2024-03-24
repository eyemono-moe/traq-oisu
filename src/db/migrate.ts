import { migrate } from 'drizzle-orm/mysql2/migrator';
import { connection, db } from '.';
await migrate(db, { migrationsFolder: './drizzle' });
await connection.end();