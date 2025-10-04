import { Card } from "@/app/types/card";

export default function CardStats({ cardData, currentCard } : { cardData: Card, currentCard: number  }) {
    let displayColors = cardData.data[currentCard]?.colors;

    if (displayColors?.length > 1) {
        displayColors = ["Multicolor"];
    } else if (displayColors?.length === 0) {
        displayColors = ["Colorless"];
    }
    else {
        const colorMap: Record<string, string> = {
            R: "Red",
            G: "Green",
            U: "Blue",
            B: "Black",
            W: "White",
        };
        displayColors = [colorMap[displayColors?.[0]] || "N/A"];
    }

    return (
        <> 
            <div className="text-stone-200">
                <>
                    <h3 className="font-serif font-bold text-2xl text-center">{cardData.data?.[currentCard].name ?? "N/A"}</h3>
                    <h3 className="mt-2"><strong>Mana Cost:</strong> {cardData.data?.[currentCard].cmc ?? "N/A"}</h3>
                    <h3><strong>Colors:</strong> {displayColors ?? "N/A"}</h3>
                    <h3><strong>Type:</strong> {cardData.data?.[currentCard].type_line ?? "N/A"}</h3>
                    <h3><strong>Set:</strong> {cardData.data?.[currentCard].set_name ?? "N/A"}</h3>
                    <h3><strong>Price:</strong> {cardData.data?.[currentCard].prices?.usd ?? "N/A"}</h3>
                    <h3><strong>Foil:</strong> {cardData.data?.[currentCard].foil ?? "N/A"}</h3>
                    <h3><strong>Artist:</strong> {cardData.data?.[currentCard].artist ?? "N/A"}</h3>
                </>
            </div>
        </>
        )
}