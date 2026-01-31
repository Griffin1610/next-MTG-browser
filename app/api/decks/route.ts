import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SavedDeck from '@/lib/models/SavedDeck';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const decks = await SavedDeck.find({ userId: session.user.id })
        .sort({ savedAt: -1 })
        .lean();

    return NextResponse.json({ decks });
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { deckName, setName, cards } = await request.json();

        if (!deckName || !setName || !cards || !Array.isArray(cards)) {
            return NextResponse.json(
                { error: 'deckName, setName, and cards are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const deck = await SavedDeck.create({
            userId: session.user.id,
            deckName,
            setName,
            cards,
        });

        return NextResponse.json({ deck }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
