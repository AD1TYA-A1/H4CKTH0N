import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

const VALID_STATUSES = ['pending', 'inprogress', 'completed'];

export async function POST(request) {
    try {
        const { caption, url, status } = await request.json();

        if (!caption || !url || !status) {
            return NextResponse.json(
                { success: false, message: 'Missing caption, url or status' },
                { status: 400 }
            );
        }

        if (!VALID_STATUSES.includes(status)) {
            return NextResponse.json(
                { success: false, message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
                { status: 400 }
            );
        }

        console.log(caption, url, 'Updating issue status to:', status);

        const client = await clientPromise;
        const db = client.db('H4CKTH0N');
        const collection = db.collection('imgURL');

        const result = await collection.findOneAndUpdate(
            { caption, url },
            { $set: { status } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json(
                { success: false, message: 'Issue not found with the given caption and url' },
                { status: 404 }
            );
        }

        console.log('Status updated successfully for:', caption);

        return NextResponse.json({
            success: true,
            message: 'Status updated successfully',
            data: result
        });

    } catch (error) {
        console.error('Error updating status:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update status' },
            { status: 500 }
        );
    }
}