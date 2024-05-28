import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { companyName: string } }) {
    const employee = await db.employee.findMany({
        where: {
            companyName: params.companyName
        }
    })

    return NextResponse.json(employee)
}