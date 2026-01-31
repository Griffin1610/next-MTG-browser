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
                <div className="space-y-4">
                    {decks.map(deck => (
                        <div key={deck._id} className="bg-stone-800 border border-stone-700 rounded-lg overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-750 transition-colors"
                                onClick={() => setExpandedDeck(expandedDeck === deck._id ? null : deck._id)}
                            >
                                <div>
                                    <h3 className="text-white font-medium">{deck.deckName}</h3>
                                    <p className="text-stone-400 text-sm">
                                        {deck.setName} &middot; {deck.cards.length} cards &middot; {new Date(deck.savedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(deck._id); }}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Delete
                                    </button>
                                    <span className="text-stone-500">{expandedDeck === deck._id ? '▲' : '▼'}</span>
                                </div>
                            </div>

                            {expandedDeck === deck._id && (
                                <div className="p-4 border-t border-stone-700">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
                                        {deck.cards.map((card, index) => (
                                            card.image_uris ? (
                                                <div key={`${card.id}-${index}`} className="flex flex-col items-center">
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
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
