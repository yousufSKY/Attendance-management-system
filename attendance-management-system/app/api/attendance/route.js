import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {

    const searchParams = req.nextUrl.searchParams;
    const branch = searchParams.get('branch');
    const month = searchParams.get('month');
    const result = await db.select({
        name: STUDENTS.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        branch: STUDENTS.branch,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id
    }).from(STUDENTS)
        .leftJoin(ATTENDANCE, and(eq(STUDENTS.id, ATTENDANCE.studentId),eq(ATTENDANCE.date, month)))
        .where(eq(STUDENTS.branch, branch))
        

    return NextResponse.json(result)
}

export async function POST(req, res) {
    const data = await req.json();
    const result = await db.insert(ATTENDANCE)
        .values({
            studentId: data.studentId,
            present: data.present,
            day: data.day,
            date: data.date
        })

    return NextResponse.json(result);
}

export async function DELETE(req) {

    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');

    const result = await db.delete(ATTENDANCE)
        .where(
            and(
                eq(ATTENDANCE.studentId, studentId),
                eq(ATTENDANCE.date, date),
                eq(ATTENDANCE.day, day)
            )
        )

    return NextResponse.json(result);
}