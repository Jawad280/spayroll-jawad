import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {

    try {
        const inputs = await req.json()

        const existingUser = await db.user.findFirst({
            where: {
                username: inputs.username
            }
        })
    
        if (existingUser) {
            return new NextResponse(JSON.stringify('User already exists'), { status: 409})
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(inputs.password, salt);
    
        const newUser = await db.user.create({
            data: {
                ...inputs,
                password: hashedPassword
            }
        })
    
        return new NextResponse(JSON.stringify(newUser), { status: 201 })

    } catch (e) {
        return new NextResponse(JSON.stringify(e), { status: 500 })
    }


}