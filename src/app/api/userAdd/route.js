import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const body = await request.json()
        const client = await clientPromise
        const db = client.db('H4CKTH0N')
        const result = await db.collection('user').insertOne({
            userName: body.userName,
            passWord: body.pass,
            pNo: body.pNo,
            createdAt: new Date()
        });
        return NextResponse.json({ sucess: true, data: "User Data Send to DB" })
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}
