'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavigationBar() {
    const currentPage = usePathname();

    return (
        <div className="bg-stone-950 text-white flex items-center relative h-20 shadow-md shadow-black/40 border-b border-stone-800/50">
            <div>
                <Link href = "/">
                    <button className={`h-20 w-25 transition-all ${currentPage === '/' ? 'bg-stone-800 hover:bg-stone-750 border-b-2 border-red-500' : 'hover:bg-stone-900'}`}>
                        Home
                    </button>
                </Link>
                <Link href = "/searchPage">
                    <button className={`h-20 w-25 transition-all ${currentPage === '/searchPage' ? 'bg-stone-800 hover:bg-stone-750 border-b-2 border-emerald-500' : 'hover:bg-stone-900'}`}>
                        Search
                    </button>
                </Link>
                <Link href = "/setPage">
                    <button className={`h-20 w-25 transition-all ${currentPage === '/setPage' ? 'bg-stone-800 hover:bg-stone-750 border-b-2 border-sky-500' : 'hover:bg-stone-900'}`}>
                       Sets
                    </button>
                </Link>
                <Link href = "/draftPage">
                    <button className={`h-20 w-25 transition-all ${currentPage === '/draftPage' ? 'bg-stone-800 hover:bg-stone-750 border-b-2 border-amber-500' : 'hover:bg-stone-900'}`}>
                        Draft
                    </button>
                </Link>
            </div>
            {currentPage != '/' &&
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center z-10">
                <p className="text-3xl font-serif whitespace-nowrap drop-shadow-md">
                    <span className="text-red-400 pr-0.5">M</span>
                    <span className="text-green-400 pr-0.5">T</span>
                    <span className="text-blue-400">G </span>
                     Browser
                </p>
            </div>
        }
        </div>
    )
}