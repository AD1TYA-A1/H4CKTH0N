import { NextResponse } from "next/server";

export async function POST(request) {

    const body = await request.json()
    const userName = body.userName

    return NextResponse.json({userName})

}
