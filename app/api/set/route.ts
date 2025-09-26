import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = await fetch(`https://api.scryfall.com/sets`);

        if (!response.ok) {
            return NextResponse.json( {error: "failed to create set dropdown"}, {status: 400 })
        }   
        
        const sets = await response.json();
        return NextResponse.json(sets);
    }
    catch (error) {
        return NextResponse.json({ error: "internal API error" }, { status: 500 })
    }
}
    
