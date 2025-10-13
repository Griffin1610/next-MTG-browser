'use client';
import SetDropdown from "../components/SetDropdown";
import Draft from "../components/Draft";

import { useState } from "react";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");
    
    const draftDeck = [];
    return (
    <div className ="flex pt-5">
        <div className="ps-20">
            <SetDropdown onSelect={setChosenSet}></SetDropdown>
            {chosenSet ? (
                <Draft setName={chosenSet} />
            ) : (
                <p>select a set to begin a draft</p>
            )}
        </div>
        <div className="ps-90">
            <h1>Current Draft Deck</h1>
        </div>
    </div>
    )
}