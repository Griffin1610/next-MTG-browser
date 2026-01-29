'use client'
import { useEffect, useState } from 'react';
import CardImage from './CardImage';
import { setCards } from '../types/setCards';

export default function Set({ setCode }: {setCode: string}) {
    const [cards, setCards] = useState<setCards[]>([]);
    const [sortBy, setSortBy] = useState<string>("name");
    const [chosenSet, setChosenSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!setCode) return;
        (async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/collection/?set=${setCode}`);
                const data = await response.json();

                if (data.data) {
                    setCards(data.data);
                    setChosenSet(true);
                }
            }
            catch {
                console.error("issue retreiving card collection");
            }
            finally {
                setIsLoading(false);
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
    {isLoading && (
        <div className="flex justify-center mt-10">
            <p className="text-stone-300 text-lg">Loading cards...</p>
        </div>
    )}
    {!isLoading && chosenSet && (
        <div className="flex justify-center mt-6 mb-8">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-800 border border-stone-700 text-stone-200 px-4 py-2 rounded-md transition-colors hover:bg-stone-750"
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
    {!isLoading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 px-4 pb-10 max-w-[1600px] mx-auto">
            {sortedCards.map((card) => (
                card.image_uris ? (
                    <div key={card.id} className="flex flex-col items-center">
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
                        <p className="text-stone-300 text-sm text-center mt-2 px-2">{card.name}</p>
                    </div>
                ) : null
            ))}
        </div>
    )}
    </>
    )
}