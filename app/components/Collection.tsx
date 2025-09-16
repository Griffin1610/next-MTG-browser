'use client'
import { useEffect, useState } from 'react';
import { Card } from "@/app/types/card";
import CardImage from './CardImage';


//props
type CollectionProps = {
  setCode: string;
};


export default function Collection( { setCode }: CollectionProps ) {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        async function fetchSet() {
            if (!setCode) return;

            const response = await fetch(`api/collection/?set=${setCode}`);
            const data = await response.json();

            if (data.data) {
                setCards(data.data);
            }
        }
        fetchSet();
    }, [setCode]);

    return (
    <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "1rem", marginTop: "1rem" }}>
                {cards.map((card) => (
                    <div key={card.id}>
                        <CardImage cardData={card} />
                        <p>{card.name}</p>
                    </div>
                ))}
        </div>
    </>
    )
}