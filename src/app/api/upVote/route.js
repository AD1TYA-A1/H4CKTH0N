import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"
export async function POST(request) {
    try {
        const body = await request.json()
        const { url, userName, upvote } = body




        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        const client = await clientPromise
        const db = client.db('H4CKTH0N')

        // Step 1: Find the document
        const doc = await db.collection('imgURL').findOne({ url: url })



        if (!doc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 })
        }

        if (doc.upVotedBy?.includes(userName)) {
            return NextResponse.json({ success: true, upVote: true })
        }
        if (upvote) {

            console.log("Karo Upvote Aram se!!!");
            
            // Step 2: Calculate new upvotes
            const newUpvotes = doc.upvotes + 1

            // if (doc.upVotedBy.includes(userName)) {
            //     return NextResponse.json({canUpVote:False})
            // }


            // Step 3: Update the document with new value
            await db.collection('imgURL').updateOne(
                { url: url },
                {
                    $set: { upvotes: newUpvotes },       // ✅ regular operator
                    $addToSet: { upVotedBy: userName }   // ✅ regular operator
                }
            )



            return NextResponse.json({ success: true, upvotes: newUpvotes, upVotedBy: doc.upVotedBy, upVote: false })
        }
        return NextResponse.json({ success: true, upVote: false })



    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}