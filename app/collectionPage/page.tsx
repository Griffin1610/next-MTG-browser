'use client';
import { useState } from "react";
import SetDropdown from "../components/SetDropdown";
import Collection from "../components/Collection";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");

    return (
        <>
            <div className="ps-20 pt-5">
                <SetDropdown onSelect={setChosenSet} />
                {chosenSet  ?
                (
                    <h1 className="pt-5">Displaying cards from set: {chosenSet}</h1>
                )
                : (
                    <h1>Select a set to begin</h1>
                )
            }
            </div>
            <div className="text-center pt-5">
                <Collection setCode={chosenSet} />       
            </div>
        </>
    );
}
