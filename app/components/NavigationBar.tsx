import Link from 'next/link'

export default function NavigationBar() {
    return (
        <div>
            <Link href = "/">
                <button>Home</button>
            </Link>
            <Link href = "/collectionPage">
                <button>Colletion</button>
            </Link>
            <Link href = "/deckPage">
                <button>Deck</button>
            </Link>
        </div>
    )
}