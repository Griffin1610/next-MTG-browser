'use client'
import { useEffect, useState } from 'react';
import CardImage from './CardImage';
import { setCards } from '../types/setCards';

export default function Set({ setCode }: {setCode: string}) {
    const [cards, setCards] = useState<setCards[]>([]);
    const [sortBy, setSortBy] = useState<string>("name");
    const [chosenSet, setChosenSet] = useState(false);

    useEffect(() => {
        if (!setCode) return;
        (async () => {
            try {
                const response = await fetch(`/api/collection/?set=${setCode}`);
                const data = await response.json();

                if (data.data) {
                    setCards(data.data);
                    setChosenSet(true);
                }
            }
            catch(error) {
                console.error("issue retreiving card collection");
            }
        })();
    }, [setCode]);

    const sortedCards = [...cards].sort((a, b) => {
    switch(sortBy) {
        case "cmc-low":
            return (a.cmc || 0) - (b.cmc || 0);
        case "cmc-high":
            return (b.cmc || 0) - (a.cmc || 0);
        case "name-asc":
            return a.name.localeCompare(b.name);
        case "name-desc":
            return b.name.localeCompare(a.name);
        case "rarity-low":
            const rarityOrderLow: { [key: string]: number } = { common: 1, uncommon: 2, rare: 3, mythic: 4 };
            return (rarityOrderLow[a.rarity || 'common'] || 0) - (rarityOrderLow[b.rarity|| 'common'] || 0);
        case "rarity-high":
            const rarityOrderHigh = { common: 1, uncommon: 2, rare: 3, mythic: 4 };
            return (rarityOrderHigh[b.rarity|| 'common'] || 0) - (rarityOrderHigh[a.rarity || 'common'] || 0);
        case "price-low":
            return (parseFloat(a.prices?.usd || "0")) - (parseFloat(b.prices?.usd || "0"));
        case "price-high":
            return (parseFloat(b.prices?.usd || "0")) - (parseFloat(a.prices?.usd || "0"));
        default:
            return 0;
    }
});

    return (
    <>
    {chosenSet && (
        <div className="flex justify-center mt-4">
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-800 text-white px-4 py-2 rounded-lg"
            >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="cmc-low">Mana Cost (Low to High)</option>
                <option value="cmc-high">Mana Cost (High to Low)</option>
                <option value="rarity-low">Rarity (Low to High)</option>
                <option value="rarity-high">Rarity (High to Low)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
            </select>
        </div>
    )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "1rem", marginTop: "1rem", width: "100%", justifyContent: "center" }}>
            {sortedCards.map((card) => (
                card.image_uris ? (
                    <div key={card.id}>
                        <CardImage 
                            isSearchPage={false}
                            cardData={{
                                data: [{
                                    ...card, 
                                    colors: card.colors ?? [], 
                                    image_uris: card.image_uris!,
                                    prices: { usd: card.prices?.usd ?? "0" },
                                }], 
                                    total_cards: 1
                            }}
                            currentCard={0} 
                        />
                        <p className="text-white text-xs text-center">{card.name}</p>
                    </div>
                ) : null
            ))}
        </div>
    </>
    )
}