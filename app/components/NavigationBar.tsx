import Link from 'next/link'

export default function NavigationBar() {
    return (
        <div className="bg-stone-950 text-white flex items-center h-20">
            <h1 className="absolute left-1/2 -translate-x-1/2 font-bold font-serif text-4xl text-white">MTG Browser</h1>
            <div className="flex space-x-4">
                <Link href = "/">
                    <button className=" hover:bg-stone-900 h-20 w-25">Home</button>
                </Link>
                <Link href = "/searchPage">
                    <button className=" hover:bg-stone-900 h-20 w-25">Search</button>
                </Link>
                <Link href = "/collectionPage">
                    <button className=" hover:bg-stone-900 h-20 w-25">Collections</button>
                </Link>
                <Link href = "/draftPage">
                    <button className=" hover:bg-stone-900 h-20 w-25">Draft</button>
                </Link>
            </div>
        </div>
    )
}