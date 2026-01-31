import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SavedDeck from '@/lib/models/SavedDeck';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const deck = await SavedDeck.findOne({
        _id: id,
        userId: session.user.id,
    }).lean();

    if (!deck) {
        return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    return NextResponse.json({ deck });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const result = await SavedDeck.deleteOne({
        _id: id,
        userId: session.user.id,
    });

    if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deck deleted' });
}
