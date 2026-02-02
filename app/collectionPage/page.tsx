'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CardImage from '../components/CardImage';
import { Card } from '@/app/types/card';

interface SavedDeck {
    _id: string;
    deckName: string;
    setName: string;
    cards: Card[];
    savedAt: string;
}

export default function Page() {
    const { data: session, status } = useSession();
    const [decks, setDecks] = useState<SavedDeck[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedDeck, setExpandedDeck] = useState<string | null>(null);

    useEffect(() => {
        if (status !== 'authenticated') {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await fetch('/api/decks');
                const data = await res.json();
                setDecks(data.decks || []);
            } catch (err) {
                console.error('Failed to load decks:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [status]);

    const handleDelete = async (deckId: string) => {
        if (!confirm('Delete this deck?')) return;
        const res = await fetch(`/api/decks/${deckId}`, { method: 'DELETE' });
        if (res.ok) {
            setDecks(decks.filter(d => d._id !== deckId));
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-stone-300 text-lg">Loading collections...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="mt-20 flex flex-col items-center">
                <p className="font-bold font-serif text-2xl text-white">Log in to view your collection</p>
                <p className="text-stone-400 mt-4">Save draft decks to build your collection</p>
            </div>
        );
    }

    return (
        <div className="mt-8 px-4 max-w-[1500px] mx-auto pb-10">
            <h1 className="text-white font-serif text-2xl mb-6 text-center">Your Saved Decks</h1>

            {decks.length === 0 ? (
                <p className="text-stone-400 text-center">No saved decks yet. Complete a draft and save it!</p>
            ) : (
                <div className="space-y-2">
                    {decks.map(deck => (
                        <div key={deck._id} className="overflow-hidden">
                            <div
                                className="flex items-center justify-between py-3 px-2 cursor-pointer group transition-colors border-b border-stone-800 hover:border-stone-600"
                                onClick={() => setExpandedDeck(expandedDeck === deck._id ? null : deck._id)}
                            >
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-stone-200 font-medium group-hover:text-white transition-colors">{deck.deckName}</h3>
                                    <p className="text-stone-500 text-sm">
                                        {deck.setName} · {deck.cards.length} cards · {new Date(deck.savedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(deck._id); }}
                                        className="text-stone-600 hover:text-red-400 text-sm transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <span className="text-stone-600 text-xs transition-transform duration-200"
                                        style={{ display: 'inline-block', transform: expandedDeck === deck._id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    >
                                        ▼
                                    </span>
                                </div>
                            </div>

                            {expandedDeck === deck._id && (
                                <div className="py-4 pl-2">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
                                        {deck.cards.map((card, index) => (
                                            card.image_uris ? (
                                                <div key={`${card.id}-${index}`} className="flex flex-col items-center">
                                                    <CardImage
                                                        isSearchPage={false}
                                                        cardData={{ data: [card], total_cards: 1 }}
                                                        currentCard={0}
                                                    />
                                                    <p className="text-stone-400 text-xs text-center mt-2">{card.name}</p>
                                                </div>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
