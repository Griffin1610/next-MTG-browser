import Link from 'next/link'

export default function NavigationBar() {
    return (
        <div>
            <Link href = "/">
                <button>Home</button>
            </Link>
            <Link href = "/collectionPage">
                <button>Collections</button>
            </Link>
            <Link href = "/draftPage">
                <button>Draft</button>
            </Link>
        </div>
    )
}