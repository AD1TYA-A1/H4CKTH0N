import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";


// POST -> Check If user Exists
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const body = await request.json();
        const pNo = body.pNo
        
        const user = await db.collection("user").findOne({
            pNo: pNo,  
        }); if (user) {
            return NextResponse.json({ success: true }, { status: 201 });
        }
        return NextResponse.json({ success: false }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}