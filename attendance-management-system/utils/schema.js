import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";

// BRANCH table definition
export const BRANCH = mysqlTable('branch', {
    id: int('id', { length: 11 }).autoincrement().primaryKey(), // Auto-increment added
    usn: varchar('usn', { length: 20 }).notNull().unique(), // Ensure this matches STUDENTS if related
    branch: varchar('branch', { length: 255 }).notNull(),
});

// STUDENTS table definition
export const STUDENTS = mysqlTable('students', {
    id: int('id', { length: 11 }).autoincrement().primaryKey(),
    name: varchar('name', { length: 25 }).notNull(),
    usn: varchar('usn', { length: 20 }).notNull().unique(), // Updated to match BRANCH usn length
    branch: varchar('branch', { length: 255 }).notNull(), // Updated to match BRANCH branch length
    contact: varchar('contact', { length: 13 }).notNull().unique(), // Length increased for +91 prefix
});

// ATTENDANCE table definition
export const ATTENDANCE = mysqlTable('attendance', {
    id: int('id', { length: 11 }).autoincrement().primaryKey(),
    studentId: int('studentId', { length: 11 }).notNull(), // Refers to STUDENTS.id
    present: boolean('present').default(false), // Corrected default value to boolean
    day: int('day', { length: 11 }).notNull(), // Assuming 22 means day of month
    date: varchar('date', { length: 20 }).notNull(), // Format: '12/2024'
});