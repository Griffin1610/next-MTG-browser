'use client';
import SetDropdown from "../components/SetDropdown";
import Draft from "../components/Draft";

import { useState } from "react";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");
    return (
    <>
        {!chosenSet && (
            <div className="mt-20 flex flex-col items-center">
                <p className="font-bold font-serif text-2xl text-white">Select a set to begin a draft</p>
                <div className="mt-10 flex justify-center">
                    <SetDropdown onSelect={setChosenSet} />
                </div>
            </div>
        )}

        {chosenSet && (
            <>
                <div className="mt-10 flex justify-center">
                    <SetDropdown onSelect={setChosenSet} />
                </div>
                <div className="mt-15 flex flex-col items-center">
                    <Draft setName={chosenSet} />
                </div>
            </>
        )}
    </>
);
}