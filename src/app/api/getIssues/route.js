import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const body = await request.json();

        const { lat, lng, maxDistance = 10000 } = body; // maxDistance in meters, default 10km

        const issues = await db.collection("imgURL").find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: maxDistance
                }
            }
        }).toArray();

        return NextResponse.json({ success: true, data: issues }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}