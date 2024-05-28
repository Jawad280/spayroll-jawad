import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const inputs = await req.json()

        const existingEmployee = await db.employee.findFirst({
            where: {
                companyName: inputs.companyName,
                NRIC: inputs.NRIC
            }
        })
    
        if (existingEmployee) {
            return new NextResponse(JSON.stringify('Employee already exists'), { status: 409})
        }
    
        const newEmployee = await db.employee.create({
            data: inputs
        })
    
        return new NextResponse(JSON.stringify(newEmployee), { status: 201 })

    } catch (e) {
        return new NextResponse(JSON.stringify(e), { status: 500 })
    }


}