'use client';
import { useState } from "react";
import SetDropdown from "../components/SetDropdown";
import Collection from "../components/Collection";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");

    return (
        <>
            <div>
                <h1>Your Collection</h1>
                <SetDropdown onSelect={setChosenSet} />
            </div>
            <div>
                <Collection setCode={chosenSet} />
                <p>Select a set to view cards</p>
            </div>
        </>
    );
}
