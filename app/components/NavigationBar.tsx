'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavigationBar() {
    const currentPage = usePathname();

    return (
        <div className="bg-stone-950 text-white flex items-center relative h-20">
            <div>
                <Link href = "/">
                    <button className={`h-20 w-25 ${currentPage === '/' ? 'bg-stone-900 hover:bg-stone-700 border-b-2 border-red-500' : 'bg-stone-950 hover:bg-stone-700'}`}>
                        Home
                    </button>
                </Link>
                <Link href = "/searchPage">
                    <button className={`h-20 w-25 ${currentPage === '/searchPage' ? 'bg-stone-900 hover:bg-stone-700 border-b-2 border-green-500' : 'bg-stone-950 hover:bg-stone-700'}`}>
                        Search
                    </button>
                </Link>
                <Link href = "/setPage">
                    <button className={`h-20 w-25 ${currentPage === '/setPage' ? 'bg-stone-900 hover:bg-stone-700 border-b-2 border-blue-500' : 'bg-stone-950 hover:bg-stone-700'}`}>
                       Sets
                    </button>
                </Link>
                <Link href = "/draftPage">
                    <button className={`h-20 w-25 ${currentPage === '/draftPage' ? 'bg-stone-900 hover:bg-stone-700 border-b-2 border-yellow-500' : 'bg-stone-950 hover:bg-stone-700'}`}>
                        Draft
                    </button>
                </Link>
            </div>
            {currentPage != '/' &&
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center z-10">
                <p className="text-3xl font-serif whitespace-nowrap">
                    <span className="text-red-500 pr-0.5">M</span>
                    <span className="text-green-500 pr-0.5">T</span>
                    <span className="text-blue-500">G </span> 
                     Browser
                </p>
            </div>
        }
        </div>
    )
}