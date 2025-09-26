import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if(!name) {
        return NextResponse.json({ error: "missing card name" }, {status: 400});
    }

    try {
        const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${name}`);

        if (!response.ok) {
            return NextResponse.json({ error: "card not found"}, { status: 400});
        }

        const card = await response.json();
        return NextResponse.json(card);
    }
    catch (error) {
        return NextResponse.json({ error: "internal API error" }, { status: 500 })
    }
}