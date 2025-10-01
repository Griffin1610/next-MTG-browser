'use client';
import SetDropdown from "../components/SetDropdown";
import { useState } from "react";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");
    
    const draftDeck = [];
    return (
    <div className ="flex pt-5">
        <div className="ps-20">
            <h1>Begin a Draft!</h1>
            <SetDropdown onSelect={setChosenSet}></SetDropdown>
            {chosenSet ? (
                <p>{chosenSet}</p>
            ) : (
                <p>select a set to begin</p>
            )}
        </div>
        <div className="ps-90">
            <h1>Current Draft Deck</h1>
        </div>
    </div>
    )
}