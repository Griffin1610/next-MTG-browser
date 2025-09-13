'use client'
import { useState } from 'react';
import SearchBar from "./components/SearchBar";



export default function Page() {
    const [cardData, setCardData] = useState<any>(null)
    return (
        <main>
            {cardData && (
            <div>
                <h2>{cardData.name}</h2>
                <img src={cardData.image_uris.normal} alt="card"/>
            </div>
            )}
            <div>
                <SearchBar onSearch={searchCard}/>
            </div>
        </main>
    )

async function searchCard(userQuery: string) {
    const response = await fetch(`/api/?name=${userQuery}`);
    const data = await response.json();
    setCardData(data);
    console.log(data);
}
}