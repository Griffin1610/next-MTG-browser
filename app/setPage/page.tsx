'use client';
import { useState } from "react";
import SetDropdown from "../components/SetDropdown";
import Set from "../components/Set";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");

    return (
        <>
            <div className="mt-5">
                <SetDropdown onSelect={setChosenSet} />
            </div>
            <div>
                <Set setCode={chosenSet} />
                <p>Select a set to view cards</p>
            </div>
        </>
    );
}
