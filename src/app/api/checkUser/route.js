import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

// POST METHOD TO ALLOW USER TO LOGIN
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("H4CKTH0N")
        const body = await request.json()
        const userName = body.userName
        const pass = body.pass

        const user = await db.collection("user").findOne({
            "userName": userName,
            "passWord": pass
        })
        if (user) {
            return NextResponse.json({ success: true ,pNo:user.pNo }, { status: 201 })
        }
        return NextResponse.json({ success: false }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}