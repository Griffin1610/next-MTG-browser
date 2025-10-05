'use client'
import Link from "next/link";
export default function Page() {
    return (
    <>
        <div className="text-center">
            <img src="/mtg-logo.png" alt="MTG Logo" className="w-80 mx-auto mt-15"/>
        </div>
        <div className="text-center mt-10 text-white">
            <p className="font-serif text-4xl mt-25">Welcome to
                <span className="text-red-500 pr-0.5"> M</span>
                <span className="text-green-500 pr-0.5">T</span>
                <span className="text-blue-500">G </span> 
                Browser
            </p>
            <div className="flex justify-center gap-20 mt-50">
                <Link href="/searchPage"><p className="underline">Find Card Prices</p></Link>
                <Link href="/setPage"><p className="underline">View All Sets</p></Link>
                <Link href="/draftPage"><p className="underline">Simulate Drafts</p></Link>
            </div>
        </div>
    </>
    )
}