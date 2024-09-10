import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { monthYear: string, companyName: string } }) {
    const payslips = await db.payslip.findMany({
        where: {
            monthYear: params.monthYear,
            companyName: params.companyName
        }
    })

    return NextResponse.json(payslips)
}