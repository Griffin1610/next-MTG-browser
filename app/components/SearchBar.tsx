import { useState } from 'react';

export default function SearchBar({ onSearch } : { onSearch: (q: string) => void }) {
    const [userQuery, setUserQuery] = useState("");
    
    return (
        <main className="mt-6">
            <input className="w-90 h-6 text-xl bg-stone-500 rounded  text-white" type = "text" value={userQuery} placeholder = "enter a card name.."
                onChange={(e) => setUserQuery(e.target.value)}>
            </input>
            <button className="bg-stone-500 h-6 mb-15 ml-5 px-2 rounded-md transform -translate-y-0.5 text-white" type = "submit" onClick ={() => onSearch(userQuery)}>Submit</button>
        </main>
    )
}