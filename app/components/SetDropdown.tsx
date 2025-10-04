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
            setSets(data.data);
        }
        fetchSets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelected(value);
        onSelect(value);
    };

    return (
        <select value={selected} onChange={handleChange} className="text-stone-950 border border-stone-950 rounded-md p-2 bg-stone-800">
            <option value="">Select a set</option>
            {sets.map((set) => (
                <option key={set.code} value={set.code}>
                {set.name} ({set.code.toUpperCase()})
                </option>
            ))}
        </select>
    );
}
