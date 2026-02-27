import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const body = await request.json();

        const result = await db.collection("imgURL").insertOne({
            upvotes:0, // By default
            caption: body.caption,
            url: body.url || null,
            createdAt: new Date(),
            ...(body.lat != null && body.lng != null && {
                location: {
                    type: "Point",
                    coordinates: [parseFloat(body.lng), parseFloat(body.lat)]
                }
            })
        });

        if (result.acknowledged) {
            return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 })
        }
        return NextResponse.json({ success: false }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}