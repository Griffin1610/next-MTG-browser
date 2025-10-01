import { useState } from 'react';

export default function SearchBar({ onSearch } : { onSearch: (q: string) => void }) {
    const [userQuery, setUserQuery] = useState("");
    
    return (
        <main>
            <input className="ml-5 bg-stone-500 rounded  text-white" type = "text" value={userQuery} placeholder = "enter a card name.."
                onChange={(e) => setUserQuery(e.target.value)}>
            </input>
            <button className="bg-stone-500 ml-5 px-3 rounded-md  text-white" type = "submit" onClick ={() => onSearch(userQuery)}>Submit</button>
        </main>
    )
}