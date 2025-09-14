import { useState } from 'react';

export default function SearchBar({ onSearch } : { onSearch: (q: string) => void }) {
    const [userQuery, setUserQuery] = useState("");
    
  return (
    <main>
        <input type = "text" value={userQuery} placeholder = "enter a card name.."
            onChange={(e) => setUserQuery(e.target.value)}></input>
        <button type = "submit" onClick ={() => onSearch(userQuery)}>Submit</button>
    </main>
  )
}