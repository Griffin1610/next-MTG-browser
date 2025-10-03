'use client'
import { useEffect, useState } from 'react';
import { Card } from "@/app/types/card";
import CardImage from './CardImage';

export default function Set({ setCode }: {setCode: string}) {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        if (!setCode) return;
        
        (async () => {
            try {
                const response = await fetch(`api/collection/?set=${setCode}`);
                const data = await response.json();

                if (data.data) {
                    setCards(data.data);
                }
            }
            catch(error) {
                console.error("issue retreiving card collection");
            }
        })();
    }, [setCode]);

    return (
    <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "1rem", marginTop: "1rem" }}>
                {cards.map((card) => (
                    card.image_uris ? (
                        <div key={card.id}>
                            <CardImage cardData={card} />
                            <p>{card.name}</p>
                        </div>
                    ) : null
                ))}
        </div>
    </>
    )
}