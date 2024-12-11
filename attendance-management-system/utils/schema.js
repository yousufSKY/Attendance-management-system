import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

// BRANCH table definition
export const BRANCH = mysqlTable('branch', {
    id: int('id').autoincrement().primaryKey(), // Auto-increment added
    usn: varchar('usn', { length: 20 }).notNull().unique(), // Ensure this matches STUDENTS if related
    branch: varchar('branch', { length: 255 }).notNull(),
    semester: int('semester').notNull(),
});

// STUDENTS table definition
export const STUDENTS = mysqlTable('students', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 25 }).notNull(),
    usn: varchar('usn', { length: 20 }).notNull(), // Updated to match BRANCH usn length
    branch: varchar('branch', { length: 255 }).notNull(), // Updated to match BRANCH branch length
    semester: varchar('semester', { length: 10 }).notNull(),
    contact: varchar('contact', { length: 13 }).notNull().unique(), // Length increased for +91 prefix
});
