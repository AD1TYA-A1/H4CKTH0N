import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("H4CKTH0N");
        const body = await request.json()


        const userName = body.userName
        const passKey = body.passKey

        const admin = await db.collection("admin").findOne({
            adminName: userName,
            adminPassKey: passKey,
        });

        if (admin) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json(
            { success: false, error: "Invalid credentials. Access denied." },
            { status: 401 }
        );

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}