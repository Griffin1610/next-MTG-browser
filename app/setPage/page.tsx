'use client';
import { useState } from "react";
import SetDropdown from "../components/SetDropdown";
import Set from "../components/Set";

export default function Page() {
    const [chosenSet, setChosenSet] = useState("");

    return (
        <>
            <div className="mt-20 flex flex-col items-center">
                {!chosenSet && 
                    <p className="font-bold font-serif text-2xl text-white">Select a set to view cards</p>
                    }
            </div>
            <div className="mt-15 flex justify-center">
                <SetDropdown onSelect={setChosenSet} />
            </div>
            <div className="mt-5 flex flex-col items-center">
                <Set setCode={chosenSet} />
            </div>
        </>
    );
}
