import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET user by id
export async function GET(req: NextRequest, { params } : { params: { id: string } }) {
    const user = await db.user.findUnique({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(user)
}

// DELETE user by id 
export async function DELETE(req: NextRequest, { params } : { params: { id: string } }) {
    const user = await db.user.delete({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(user)
}

// PATCH user by id
export async function PATCH(req: NextRequest, { params } : { params: { id: string } }) {
    
    const inputs = await req.json()
    
    const user = await db.user.update({
        where: {
            id: params.id
        },
        data: inputs
    })

    return NextResponse.json(user)
}