'use client'
import { useState, useRef, useEffect } from 'react';
import { Card } from "@/app/types/card";

export default function SearchBar({ onSearch } : { onSearch: (q: string) => void }) {
    const [userQuery, setUserQuery] = useState("");
    const [lastSearched, setLastSearched] = useState("");
    const [suggestions, setSuggestions] = useState<Card[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (cardName: string) => {
        const nameToSearch = cardName.trim();
        if (!nameToSearch) return;
        
        setLastSearched(nameToSearch);
        onSearch(nameToSearch);
        setSuggestions([]);
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
    };

    const handleSubmit = () => {
        const searchTerm = userQuery.trim() || lastSearched;
        if (searchTerm) {
            handleSelect(searchTerm);
            setUserQuery("");
        }
        inputRef.current?.blur();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || suggestions.length === 0) {
            if (e.key === 'Enter') {
                handleSubmit();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelect(suggestions[selectedIndex].name);
                    setUserQuery("");
                } else {
                    handleSubmit();
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
        }
    };

    return (
        <div className="mt-6 w-80 mx-auto relative z-50" ref={wrapperRef}>
            <div className="flex gap-2 relative z-10">
                <input 
                    ref={inputRef}
                    className="flex-1 h-10 px-3 text-base bg-stone-500 rounded text-white placeholder-stone-300"
                    type="text" 
                    value={userQuery} 
                    placeholder="enter a card name.."
                    onChange={async (e) => {
                        const value = e.target.value;
                        setUserQuery(value);
                        setSelectedIndex(-1);
                        
                        if (abortControllerRef.current) {
                            abortControllerRef.current.abort();
                        }
                        
                        if(value.length > 1) {
                            setIsLoading(true);

                                try {
                                    const response = await fetch(`/api/searchSuggestion/?name=${encodeURIComponent(value)}`)
                                    const result = await response.json();

                                    if (!response.ok || result.error) {
                                        setSuggestions([]);
                                        setIsOpen(false);
                                        setIsLoading(false);
                                        return;
                                    }
                                    
                                    const seenNames = new Set<string>();
                                    const uniqueCards: Card[] = [];
                                    const firstChar = value[0].toLowerCase();

                                    for (const card of result.data) {
                                        if (!seenNames.has(card.name)) {
                                            seenNames.add(card.name);
                                            uniqueCards.push(card);
                                        }
                                    }
                                    uniqueCards.sort((a, b) => {
                                        const aStartsWithChar = a.name.toLowerCase().startsWith(firstChar);
                                        const bStartsWithChar = b.name.toLowerCase().startsWith(firstChar);
                                        
                                        if (aStartsWithChar && !bStartsWithChar) return -1;
                                        if (!aStartsWithChar && bStartsWithChar) return 1;
                                        return a.name.localeCompare(b.name);
                                    });

                                    const topCards = uniqueCards.slice(0, 5);
                                    
                                    setSuggestions(topCards);
                                    setIsOpen(topCards.length > 0);
                                    setIsLoading(false);
                                } catch (error: any) {
                                    if (error.name === 'AbortError') {
                                        return;
                                    }
                                    setSuggestions([]);
                                    setIsOpen(false);
                                    setIsLoading(false);
                                }
                        } else {
                            setSuggestions([]);
                            setIsOpen(false);
                            setIsLoading(false);
                        }
                    }}
                    onFocus={() => {
                        if (suggestions.length > 0) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="bg-stone-500 h-10 px-4 rounded-md text-white hover:bg-stone-700 transition-colors relative z-20"
                    type="button" 
                    onClick={handleSubmit}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    Submit
                </button>
            </div>
            
            {isOpen && isLoading && (
                <div className="absolute mt-1 bg-stone-700 rounded shadow-lg w-full p-3 z-30 border border-stone-600 left-0">
                    <p className="text-white text-sm">Loading...</p>
                </div>
            )}
            {isOpen && !isLoading && suggestions.length > 0 && (
                <ul className="absolute mt-1 bg-stone-700 rounded shadow-lg w-full max-h-60 overflow-y-auto z-30 border border-stone-600 left-0">
                    {suggestions.map((card, index) => (
                        <li
                            key={card.id}
                            className={`px-3 py-2 cursor-pointer text-white transition-colors first:rounded-t last:rounded-b ${
                                index === selectedIndex ? 'bg-stone-500' : 'hover:bg-stone-600'
                            }`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect(card.name);
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            {card.name}
                        </li>
                    ))}
                </ul>
            )}        
        </div>
    )
}