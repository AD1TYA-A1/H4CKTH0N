import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const body = await request.json();

        // Only caption is truly required
        if (!body.caption) {
            return NextResponse.json(
                { error: "Caption is required" },
                { status: 400 }
            );
        }

        const document = {
            caption: body.caption,
            url: body.url || null,
            createdAt: new Date(),
        };

        // Only add location if BOTH lat and lng are real numbers
        if (body.lat != null && body.lng != null && 
            !isNaN(body.lat) && !isNaN(body.lng)) {
            document.location = {
                type: "Point",
                coordinates: [parseFloat(body.lng), parseFloat(body.lat)]
            };
        }

        const result = await db.collection("imgURL").insertOne(document);

        if (result.acknowledged) {
            return NextResponse.json(
                { success: true, insertedId: result.insertedId },
                { status: 201 }
            );
        }

        return NextResponse.json({ success: false }, { status: 200 });

    } catch (error) {
        console.error("MongoDB insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}