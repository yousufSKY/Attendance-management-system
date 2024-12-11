import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "attendance_management",
  password:'T@n$L10d12m#!',
  port:'3306'
});

export const db = drizzle({ client: connection });
