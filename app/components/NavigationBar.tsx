import Link from 'next/link'

export default function NavigationBar() {
    return (
        <div className="bg-stone-950 text-white flex items-center relative h-20">
            <div>
                <Link href = "/">
                    <button className=" hover:bg-stone-900 h-20 w-25">Home</button>
                </Link>
                <Link href = "/searchPage">
                    <button className=" hover:bg-stone-900 h-20 w-25">Search</button>
                </Link>
                <Link href = "/setPage">
                    <button className=" hover:bg-stone-900 h-20 w-25">Sets</button>
                </Link>
                <Link href = "/draftPage">
                    <button className=" hover:bg-stone-900 h-20 w-25">Draft</button>
                </Link>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                <p className="text-3xl font-serif">MTG Browser</p>
            </div>
        </div>
    )
}