import { NextResponse } from "next/server";
import exifr from "exifr";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const gps = await exifr.gps(buffer);

        const isGeotagged = !!(gps?.latitude && gps?.longitude);

        return NextResponse.json({
            success: true,
            isGeotagged,
            coordinates: isGeotagged ? { lat: gps.latitude, lng: gps.longitude } : null
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}