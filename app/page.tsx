'use client'
import Link from "next/link";
export default function Page() {
    return (
    <div className="mt-15">
        <div className="text-center pt-20 pb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mtg-logo-free-use.png" alt="MTG Logo" className="w-72 md:w-96 mx-auto drop-shadow-lg"/>
        </div>

        <div className="text-center text-white px-4 pb-20">
            <h1 className="font-serif text-3xl md:text-5xl mb-8">
                Welcome to{' '}
                <span className="text-red-400">M</span>
                <span className="text-green-400">T</span>
                <span className="text-blue-400">G</span>{' '}
                Browser
            </h1>

            <p className="text-stone-300 text-base md:text-lg mb-16 max-w-2xl mx-auto">
                Search thousands of Magic cards, check prices, browse complete sets, and practice your draft skills
            </p>

            <div className="flex flex-wrap justify-center gap-12">
                <Link href="/searchPage" className="group text-stone-300 text-lg font-medium tracking-wide transition-all hover:text-emerald-400 hover:shadow-emerald-500/20 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.3)] hover:-translate-y-0.5">
                    Find Card Prices
                </Link>
                <Link href="/setPage" className="group text-stone-300 text-lg font-medium tracking-wide transition-all hover:text-sky-400 hover:shadow-sky-500/20 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.3)] hover:-translate-y-0.5">
                    View All Sets
                </Link>
                <Link href="/draftPage" className="group text-stone-300 text-lg font-medium tracking-wide transition-all hover:text-amber-400 hover:shadow-amber-500/20 hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:-translate-y-0.5">
                    Simulate Drafts
                </Link>
            </div>
        </div>

        <footer className="fixed bottom-0 right-0 bg-stone-950/80 backdrop-blur-sm text-stone-300 text-right p-2">
            <p className="text-xs">A Project by Griffin Polly. 2025</p>
        </footer>
    </div>
    )
}