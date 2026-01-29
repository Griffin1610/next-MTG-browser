'use client'
import Link from "next/link";
export default function Page() {
    return (
    <div className="mt-15">
        <div className="text-center pt-20 pb-12">
            <img src="/mtg-logo.png" alt="MTG Logo" className="w-72 md:w-96 mx-auto drop-shadow-lg"/>
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

            <div className="flex flex-wrap justify-center gap-10">
                <Link href="/searchPage" className="group">
                    <div className="bg-gradient-to-br from-stone-800 to-stone-850 border border-stone-600 px-8 py-6 min-w-[200px] transition-all hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5">
                        <p className="text-stone-100 group-hover:text-emerald-400 transition-colors font-medium">Find Card Prices</p>
                    </div>
                </Link>
                <Link href="/setPage" className="group">
                    <div className="bg-gradient-to-br from-stone-800 to-stone-850 border border-stone-600 px-8 py-6 min-w-[200px] transition-all hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5">
                        <p className="text-stone-100 group-hover:text-sky-400 transition-colors font-medium">View All Sets</p>
                    </div>
                </Link>
                <Link href="/draftPage" className="group">
                    <div className="bg-gradient-to-br from-stone-800 to-stone-850 border border-stone-600 px-8 py-6 min-w-[200px] transition-all hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5">
                        <p className="text-stone-100 group-hover:text-amber-400 transition-colors font-medium">Simulate Drafts</p>
                    </div>
                </Link>
            </div>
        </div>

        <footer className="fixed bottom-0 right-0 bg-stone-950/80 backdrop-blur-sm text-stone-300 text-right p-2">
            <p className="text-xs">A Project by Griffin Polly. 2025</p>
        </footer>
    </div>
    )
}