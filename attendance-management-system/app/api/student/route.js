import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req,res) {
    const data=await req.json();

    const result=await db.insert(STUDENTS)
    .values({
        name: data?.name,
        usn: data?.usn,
        branch: data?.branch,
        semester: data?.semester,
        contact: data?.contact,

    })

    return NextResponse.json(result);
}