import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const inputs = await req.json();

        const upsertPromises = inputs.map((payslip: any) => 
            db.payslip.upsert({
                where: {
                    NRIC_monthYear_companyName: {
                        NRIC: payslip.NRIC,
                        monthYear: payslip.monthYear,
                        companyName: payslip.companyName,
                    },
                },
                create: {
                    ...payslip,
                    other: '',
                    otherDeduction: 0
                },
                update: {
                    ...payslip
                },
            })
        );

        // Wait for all upsert operations to complete
        const newPayslips = await Promise.all(upsertPromises);

        return new NextResponse(JSON.stringify(newPayslips), { status: 200 });

    } catch (e) {
        return new NextResponse(JSON.stringify(e), { status: 500 })
    }
}