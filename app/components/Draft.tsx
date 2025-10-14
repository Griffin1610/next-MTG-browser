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
        const usedIndices = new Set<number>();
        
        while (pack.length < 15) {
            const randomIndex = Math.floor(Math.random() * set.length);
            if (!usedIndices.has(randomIndex)) {
                pack.push(set[randomIndex]);
                usedIndices.add(randomIndex);
            }
        }
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

    const handleCardPick = (cardIndex: number) => {
        if (draftState.isComplete) return;

        const currentPack = draftState.packQueue[0];
        const pickedCard = currentPack[cardIndex];
        
        const newDraftPool = [...draftState.draftPool, pickedCard];
        
        const newCurrentPack = currentPack.filter((_, index) => index !== cardIndex);
        
        const newQueue = [...draftState.packQueue];
        newQueue[0] = newCurrentPack;
        
        for (let i = 1; i < newQueue.length; i++) {
            if (newQueue[i].length > 0) {
                const randomIndex = Math.floor(Math.random() * newQueue[i].length);
                newQueue[i].splice(randomIndex, 1);
            }
        }
        
        const packToMove = newQueue.shift()!;
        newQueue.push(packToMove);

        const newPick = draftState.currentPick + 1;
        const isRoundComplete = newPick >= 15;
        const isDraftComplete = isRoundComplete && draftState.currentRound >= 2;

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
                <p className="text-white text-lg">Generating draft packs...</p>
            </div>
        );
    }

    if (draftState.isComplete) {
        return (
            <div className="mt-5 flex flex-col items-center">
                <div className="text-center mb-6">
                    <h2 className="text-white text-2xl mb-2">Draft Complete!</h2>
                    <p className="text-white text-sm">Your draft pool ({(draftState.draftPool || []).length} cards)</p>
                </div>
                
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(5, 1fr)", 
                    gap: "1rem", 
                    marginTop: "1rem", 
                    width: "100%", 
                    justifyContent: "center" 
                }}>
                    {(draftState.draftPool || []).map((card, index) => (
                        card.image_uris ? (
                            <div 
                                key={`${card.id}-${index}`}
                                className="hover:opacity-80 transition-opacity"
                            >
                                <CardImage 
                                    isSearchPage={false}
                                    cardData={{ data: [card] }}
                                    currentCard={0} 
                                />
                                <p className="text-white text-xs text-center">{card.name}</p>
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
        <div className="mt-5 flex flex-col items-center">
            <div className="text-center mb-6">
                <h2 className="text-white text-xl mb-2">Pack {packNumber} - Pick {pickNumber}</h2>
                <p className="text-white text-sm">Choose a card to draft</p>
            </div>
            
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(5, 1fr)", 
                gap: "1rem", 
                marginTop: "1rem", 
                width: "100%", 
                justifyContent: "center" 
            }}>
                {currentPack.map((card, index) => (
                    card.image_uris ? (
                        <div 
                            key={`${card.id}-${index}`}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleCardPick(index)}
                        >
                            <CardImage 
                                isSearchPage={false}
                                cardData={{ data: [card] }}
                                currentCard={0} 
                            />
                            <p className="text-white text-xs text-center">{card.name}</p>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
}
