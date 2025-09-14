import Link from 'next/link'

export default function NavigationBar() {
    return (
        <div>
            <Link href = "/">
                <button>Home</button>
            </Link>
            <Link href = "/collection">
                <button>Colletion</button>
            </Link>
            <Link href = "/deck">
                <button>Deck</button>
            </Link>
        </div>
    )
}