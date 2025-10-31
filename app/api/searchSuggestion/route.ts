import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if(!name) {
        return NextResponse.json({ error: "missing card name" }, {status: 400});
    }

    try {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(name)}&unique=prints`);

        if (!response.ok) {
            return NextResponse.json({ error: "card not found"}, { status: 400});
        }

        const suggestions = await response.json();
        return NextResponse.json(suggestions);
    }
    catch (error) {
        return NextResponse.json({ error: "internal API error" }, { status: 500 })
    }
}
