import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
// POST -> Add URL To MongoDB
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const body = await request.json();
        const url = body.url
        const user = await db.collection("imgURL").insertOne({
            url: url,
        });
        if (user) {
            return NextResponse.json({ success: true }, { status: 201 });
        }
        return NextResponse.json({ success: false }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}