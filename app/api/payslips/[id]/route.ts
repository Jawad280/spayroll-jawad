import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { id: string } }) {
    const employee = await db.payslip.findUnique({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(employee)
}

export async function PATCH(req: NextRequest, { params } : { params: { id: string } }) {
    const inputs = await req.json()

    const updatedPayslip = await db.payslip.update({
        where: {
            id: params.id
        },
        data: inputs
    })

    return NextResponse.json(updatedPayslip)
}