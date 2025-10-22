'use client'
import { useState } from 'react';
import { Card } from "@/app/types/card";
import SearchBar from "../components/SearchBar";
import CardStats from "../components/CardStats";
import CardImage from '../components/CardImage';

type CardData = {
  total_cards: number;
  data: Card[];
  error?: string;
};

export default function Page() {
    const [cardData, setCardData] = useState<CardData | null>(null);
    const [currentCard, setCurrentCard] = useState(0);
    const totalCards = cardData?.total_cards || 0;

    async function searchCard(userQuery: string) {
        const response = await fetch(`/api/card/?name=${encodeURIComponent(userQuery)}`);
        const data = await response.json();
        setCardData(data);
        setCurrentCard(0);
    }

    return (
        <main>
            <div className="text-center mt-20">
                <h3 className="font-bold font-serif text-2xl text-white">Search for a card below to get started </h3>
                <div className="mt-15"></div>
                <SearchBar onSearch={searchCard}/>
            </div>
            <div className="flex justify-center px-10 items-start relative z-0">
                {cardData && !cardData.error &&
                <div className="flex-none w-1/5 bg-stone-800 p-5 rounded-lg transform -translate-x-10 mt-30">
                    <CardStats cardData={cardData?.data[currentCard]}/>
                </div>
                }
                {cardData?.error && 
                    <div className="mt-25">
                        <h3 className="font-bold font-serif text-xl text-white ml-170">Card not found, please try again</h3>
                    </div>
                }
                <div className="w-16"/>
                <div className="flex-none w-1/3 flex flex-col items-center justify-center translate-x-10 -mt-20">
                    <CardImage  isSearchPage={true} cardData={cardData} currentCard={currentCard} />
                        <div className="flex items-center -mt-22">
                            {cardData && !cardData.error &&
                            <>
                                <button className=" bg-red-600 h-6 mb-15 px-2 rounded-md text-white hover:bg-red-700 -mt-5"
                                    onClick={() => setCurrentCard(prev => prev === 0 ? cardData?.data?.length - 1 : prev - 1)}>
                                        Back
                                </button>
                                <h3 className="ml-10 -mt-10 text-large text-white">{currentCard + 1}/{totalCards}</h3>
                                <button className="ml-10 bg-green-600 h-6 mb-15 px-2 rounded-md text-white hover:bg-green-700 -mt-5"
                                    onClick={() => setCurrentCard(prev => prev === cardData?.data?.length - 1 ? 0 : prev + 1)}>
                                        Next
                                </button>
                            </>
                    }
                        </div>
                </div>
            </div>
        </main>
    )
}