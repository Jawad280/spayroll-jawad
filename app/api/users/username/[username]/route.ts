import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { username: string } }) {
    const user = await db.user.findUnique({
        where: {
            username: params.username
        }
    })

    return NextResponse.json(user)
}