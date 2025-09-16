'use client';
import { useState, useEffect } from "react";

type SetDropdownProps = {
  onSelect: (setCode: string) => void;
};

type MTGSet = {
  code: string;
  name: string;
};

export default function SetDropdown({ onSelect }: SetDropdownProps) {
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
    <select value={selected} onChange={handleChange}>
      <option value="">Select a set</option>
      {sets.map((set) => (
        <option key={set.code} value={set.code}>
          {set.name} ({set.code.toUpperCase()})
        </option>
      ))}
    </select>
  );
}
