import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const setCode = searchParams.get('set');
  
  if (!setCode) {
    return NextResponse.json({ error: "Set code required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.scryfall.com/cards/search?q=set:${setCode}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch cards" }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}