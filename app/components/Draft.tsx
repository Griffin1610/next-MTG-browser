'use client';
import { useEffect, useState } from "react";
import { Card } from "@/app/types/card";
import CardImage from "./CardImage";

interface DraftState {
    currentRound: number;
    currentPick: number;
    packQueue: Card[][];
    isComplete: boolean;
    draftPool: Card[];
}

export default function Draft({ setName }: { setName: string }) {
    const [draftState, setDraftState] = useState<DraftState>({
        currentRound: 0,
        currentPick: 0,
        packQueue: [],
        isComplete: false,
        draftPool: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [allPacks, setAllPacks] = useState<Card[][][]>([]);

    const generatePack = (set: Card[]): Card[] => {
        const pack: Card[] = [];

        // Separate cards by rarity and type
        const rares = set.filter(c => c.rarity === 'rare' || c.rarity === 'mythic');
        const uncommons = set.filter(c => c.rarity === 'uncommon');
        const commons = set.filter(c => c.rarity === 'common' && !c.type_line?.includes('Basic Land'));
        const basicLands = set.filter(c => c.type_line?.includes('Basic Land'));

        // Helper to pick random cards
        const pickRandom = (cards: Card[], count: number): Card[] => {
            const picked: Card[] = [];
            const available = [...cards];
            for (let i = 0; i < count && available.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * available.length);
                picked.push(available[randomIndex]);
                available.splice(randomIndex, 1);
            }
            return picked;
        };

        // Build pack: 1 rare, 3 uncommons, 10 commons, 1 basic land
        pack.push(...pickRandom(rares, 1));
        pack.push(...pickRandom(uncommons, 3));
        pack.push(...pickRandom(commons, 10));
        pack.push(...pickRandom(basicLands, 1));

        return pack;
    };

    useEffect(() => {
        if (!setName) return;
        
        setIsLoading(true);
        (async () => {
            try {
                const res = await fetch(`/api/collection?set=${setName}`);
                const data = await res.json();

                if (!data?.data) {
                    console.error("No cards returned");
                    setIsLoading(false);
                    return;
                }

                const set = data.data;
                const packs: Card[][][] = [];

                for (let round = 0; round < 3; round++) {
                    const roundPacks: Card[][] = [];
                    for (let player = 0; player < 8; player++) {
                        roundPacks.push(generatePack(set));
                    }
                    packs.push(roundPacks);
                }

                setAllPacks(packs);
                setDraftState({
                    currentRound: 0,
                    currentPick: 0,
                    packQueue: [...packs[0]],
                    isComplete: false,
                    draftPool: []
                });
            } catch (err) {
                console.error("Failed to fetch cards:", err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [setName]);

    const botPickCard = (pack: Card[]): number => {
        // Separate cards by rarity
        const rares = pack.map((c, i) => ({ card: c, index: i })).filter(({ card }) => card.rarity === 'rare' || card.rarity === 'mythic');
        const uncommons = pack.map((c, i) => ({ card: c, index: i })).filter(({ card }) => card.rarity === 'uncommon');
        const commons = pack.map((c, i) => ({ card: c, index: i })).filter(({ card }) => card.rarity === 'common');

        const rand = Math.random();

        // 65% chance to pick rare (if available)
        if (rand < 0.65 && rares.length > 0) {
            return rares[Math.floor(Math.random() * rares.length)].index;
        }
        // 15% chance to pick uncommon (if available)
        else if (rand < 0.80 && uncommons.length > 0) {
            return uncommons[Math.floor(Math.random() * uncommons.length)].index;
        }
        // 20% chance to pick common, or fallback if preferred rarity not available
        else if (commons.length > 0) {
            return commons[Math.floor(Math.random() * commons.length)].index;
        }
        // Fallback to any available card if preferred rarities are gone
        else if (uncommons.length > 0) {
            return uncommons[Math.floor(Math.random() * uncommons.length)].index;
        }
        else if (rares.length > 0) {
            return rares[Math.floor(Math.random() * rares.length)].index;
        }
        // Last resort - pick any remaining card
        return Math.floor(Math.random() * pack.length);
    };

    const handleCardPick = (cardIndex: number) => {
        if (draftState.isComplete) return;

        const currentPack = draftState.packQueue[0];
        const pickedCard = currentPack[cardIndex];

        const newDraftPool = [...draftState.draftPool, pickedCard];

        const newCurrentPack = currentPack.filter((_, index) => index !== cardIndex);

        const newQueue = [...draftState.packQueue];
        newQueue[0] = newCurrentPack;

        // Bots pick cards from their packs using weighted algorithm
        for (let i = 1; i < newQueue.length; i++) {
            if (newQueue[i].length > 0) {
                const pickIndex = botPickCard(newQueue[i]);
                newQueue[i].splice(pickIndex, 1);
            }
        }
        
        const packToMove = newQueue.shift()!;
        newQueue.push(packToMove);

        const newPick = draftState.currentPick + 1;
        const isRoundComplete = newPick >= 15;

        if (isRoundComplete) {
            const nextRound = draftState.currentRound + 1;
            if (nextRound < 3) {
                setDraftState({
                    currentRound: nextRound,
                    currentPick: 0,
                    packQueue: [...allPacks[nextRound]],
                    isComplete: false,
                    draftPool: newDraftPool
                });
            } else {
                setDraftState({
                    currentRound: nextRound,
                    currentPick: 0,
                    packQueue: [],
                    isComplete: true,
                    draftPool: newDraftPool
                });
            }
        } else {
            setDraftState({
                currentRound: draftState.currentRound,
                currentPick: newPick,
                packQueue: newQueue,
                isComplete: false,
                draftPool: newDraftPool
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-stone-300 text-lg">Generating draft packs...</p>
            </div>
        );
    }

    if (draftState.isComplete) {
        return (
            <div className="mt-6 flex flex-col items-center pb-10">
                <div className="text-center mb-6 px-4">
                    <h2 className="text-stone-200 font-serif text-2xl mb-2">Draft Complete!</h2>
                    <p className="text-stone-300 text-sm">Your draft pool ({(draftState.draftPool || []).length} cards)</p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 px-3 max-w-[1500px] mx-auto">
                    {(draftState.draftPool || []).map((card, index) => (
                        card.image_uris ? (
                            <div
                                key={`${card.id}-${index}`}
                                className="flex flex-col items-center"
                            >
                                <CardImage
                                    isSearchPage={false}
                                    cardData={{ data: [card], total_cards: 1 }}
                                    currentCard={0}
                                />
                                <p className="text-stone-300 text-xs text-center mt-2">{card.name}</p>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        );
    }

    const packNumber = draftState.currentRound + 1;
    const pickNumber = draftState.currentPick + 1;
    const currentPack = draftState.packQueue[0] || [];

    return (
        <div className="mt-4 flex flex-col items-center pb-6">
            <div className="text-center mb-4 px-4">
                <h2 className="text-stone-200 font-serif text-xl mb-1">Pack {packNumber} - Pick {pickNumber}</h2>
                <p className="text-stone-300 text-sm">Choose a card to draft</p>
            </div>

            <div className="grid grid-cols-5 gap-4 px-3 justify-items-center">
                {currentPack.map((card, index) => (
                    card.image_uris ? (
                        <div
                            key={`${card.id}-${index}`}
                            className="cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
                            onClick={() => handleCardPick(index)}
                        >
                            <CardImage
                                isSearchPage={false}
                                cardData={{ data: [card], total_cards: 1 }}
                                currentCard={0}
                            />
                            <p className="text-stone-300 text-sm text-center mt-2">{card.name}</p>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
}
