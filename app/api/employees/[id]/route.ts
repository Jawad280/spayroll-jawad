import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { id: string } }) {
    const employee = await db.employee.findUnique({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(employee)
}

export async function PATCH(req: NextRequest, { params } : { params: { id: string } }) {
    const inputs = await req.json()

    const updatedEmployee = await db.employee.update({
        where: {
            id: params.id
        },
        data: inputs
    })

    return NextResponse.json(updatedEmployee)
}