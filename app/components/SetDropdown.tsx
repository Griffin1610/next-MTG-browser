'use client';
import { useState, useEffect } from "react";
import { MTGSet } from "@/app/types/mtgSet";

export default function SetDropdown({ onSelect } : { onSelect : (setCode : string) => void }) {
    const [sets, setSets] = useState<MTGSet[]>([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        async function fetchSets() {
            const response = await fetch("/api/set");
            const data = await response.json();
            const now = new Date();
            const filteredData = data.data.filter(
            (set: MTGSet) => {
                const isCorrectType = set.set_type === "core" || set.set_type === "expansion";
                const isReleased = new Date(set.released_at) <= now;
                return isCorrectType && isReleased;
            });
            setSets(filteredData);
        }
        fetchSets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelected(value);
        onSelect(value);
    };

    return (
        <select value={selected} onChange={handleChange} className="text-stone-300 border border-stone-950 rounded-md p-2 bg-stone-800 w-80">
            <option value="">Select a set</option>
            {sets.map((set) => (
                <option key={set.code} value={set.code}>
                {set.name} ({set.code.toUpperCase()})
                </option>
            ))}
        </select>
    );
}
