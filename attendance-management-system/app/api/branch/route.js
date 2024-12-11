import { db } from "@/utils";
import { BRANCH } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req){

    const result = await db.select().from(BRANCH);

    return NextResponse.json(result);
}