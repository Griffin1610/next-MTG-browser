import { NextResponse } from "next/server";

let setsCache: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
    try {
        const now = Date.now();

        if (setsCache && (now - cacheTimestamp) < CACHE_DURATION) {
            return NextResponse.json(setsCache);
        }

        const response = await fetch(`https://api.scryfall.com/sets`, {
            headers: {
                'Cache-Control': 'public, max-age=86400'
            }
        });

        if (!response.ok) {
            return NextResponse.json( {error: "failed to create set dropdown"}, {status: 400 })
        }   
        
        const sets = await response.json();
        setsCache = sets;
        cacheTimestamp = now;
        
        return NextResponse.json(sets);
    }
    catch (error) {
        return NextResponse.json({ error: "internal API error" }, { status: 500 })
    }
}
    
