import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = await fetch(`https://api.scryfall.com/sets`);

    if(!response.ok) {
        return NextResponse.json( {error: "failed to fetch sets"}, {status: 400 })
    }

    const data = await response.json();
    return NextResponse.json(data);
}