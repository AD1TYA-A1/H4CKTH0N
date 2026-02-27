import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import clientPromise from '../../lib/mongodb'



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
    try {



        const data = await request.formData()
        const file = data.get('file')

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file uploaded' },
                { status: 400 }
            )
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64, {
            folder: 'cityfix',   // saves in a cityfix folder
        })

        try {
            const client = await clientPromise;
            const db = client.db('H4CKTH0N');
            const body = await request.json();
            const url = body.url
            const user = await db.collection("user").insertOne({
                url: url,
            });

        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }


        // ✅ result.secure_url is your image link!
        return NextResponse.json({
            success: true,
            url: result.secure_url
        })

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}