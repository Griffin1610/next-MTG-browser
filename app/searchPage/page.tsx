'use client'
import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import CardStats from "../components/CardStats";
import CardImage from '../components/CardImage';



export default function Page() {
    const [cardData, setCardData] = useState<any>(null)
    return (
        <main>
            <div className="flex py-10">
                <h3 className="font-bold font-serif text-xl text-white">Search for a card: </h3>
                <SearchBar onSearch={searchCard}/>
            </div>
            <div className="flex space-x-70">
                <div className="bg-stone-800">
                    <CardStats cardData={cardData}/>
                </div>
                <div>
                    <CardImage cardData={cardData}/>
                </div>
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