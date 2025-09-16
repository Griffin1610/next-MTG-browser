'use client'
import { useState } from 'react';
import SearchBar from "./components/SearchBar";
import CardStats from "./components/CardStats";
import CardImage from './components/CardImage';



export default function Page() {
    const [cardData, setCardData] = useState<any>(null)
    return (
        <main>
            <h1>Home Page</h1>
            <div>
                <SearchBar onSearch={searchCard}/>
            </div>
            <div>
                <CardImage cardData={cardData}/>
            </div>
            <div>
                <CardStats cardData={cardData}/>
            </div>

        </main>
    )

async function searchCard(userQuery: string) {
    const response = await fetch(`/api/card/?name=${userQuery}`);
    const data = await response.json();
    setCardData(data);
    console.log(data);
}
}