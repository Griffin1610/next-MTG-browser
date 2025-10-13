'use client';
import { useEffect, useState } from "react";
import { Card } from "@/app/types/card";


export default function Draft({ setName }: { setName: string }) {
    const [packs, setPacks] = useState<Card[][]>();

    useEffect(() => {
        if (!setName) return;
        (async () => {
        try {
            const res = await fetch(`/api/collection?set=${setName}`);
            const data = await res.json();

            if (!data?.data) {
                console.error("No cards returned");
                return (
                    <p>No cards found</p>
                )
            }

        const set = data.data;
        const generatedPacks: Card[][] = []

        for (let i = 0; i < 8; i++) {
            const pack: Card[] = [];
            while (pack.length < 15) {
            const randomCard = set[Math.floor(Math.random() * set.length)];
            pack.push(randomCard);
            }
            generatedPacks.push(pack);
        }
        setPacks(generatedPacks);
        } catch (err) {
            console.error("Failed to fetch cards:", err);
        }
        })();
    }, [setName]);
    
    return (
        <div>
            {packs?.map((pack, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
            <h3 className="text-white">Pack {i + 1}</h3>
            {pack.map((card, idx) => (
                <p key={idx} className="text-white">{card.name}</p>
            ))}
            </div>
        ))}
        </div>
    );
}