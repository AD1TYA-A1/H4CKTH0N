// Get Issues for the clients or users with respect to distance

import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const body = await request.json();

        const completedTasks = [];
        const inProgressTasks = [];
        const pendingTasks = [];

        const { lat, lng, maxDistance = 10000 } = body; // maxDistance in meters, default 10km


        const issues = await db.collection("imgURL").find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: maxDistance
                }
            }
        }).toArray();



        // console.log(issues[0].status);
        // console.log(issues[2].status);
        // console.log(issues[3].status);
        // console.log("TOTAL ISSUES", issues.length);

        var completed = 0
        var inProgress = 0
        var pending = 0

        for (let a = 0; a < issues.length; a++) {
            const element = issues[a];
            if (element.status == "completed") {
                completedTasks.push(issues[a])
                completed += 1
            } else if (element.status == "pending") {
                pendingTasks.push(issues[a])
                pending += 1
            } else {
                inProgressTasks.push(issues[a])
                inProgress += 1
            }

        }





        console.log("Completed: ", completed);
        console.log("In Progress: ", inProgress);
        console.log("Pending", pending);


        return NextResponse.json({ success: true, completed:completedTasks, inProgress:inProgressTasks, pending:pendingTasks }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}