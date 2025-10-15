import { Card } from "@/app/types/card";

export default function CardStats({ cardData } : { cardData: Card }) {
    let displayColors = cardData.colors;

    if (displayColors?.length > 1) {
        displayColors = ["Multicolor"];
    } else if (displayColors?.length === 0) {
        displayColors = ["Colorless"];
    } else {
        const colorMap: Record<string, string> = {
            R: "Red",
            G: "Green",
            U: "Blue",
            B: "Black",
            W: "White",
        };
        displayColors = [colorMap[displayColors[0]] || "N/A"];
    }

    return (
        <div className="text-stone-200">
            <h3 className="font-serif font-bold text-2xl text-center">{cardData.name ?? "N/A"}</h3>
            <h3 className="mt-2"><strong>Mana Cost:</strong> {cardData.cmc ?? "N/A"}</h3>
            <h3><strong>Colors:</strong> {displayColors ?? "Not listed"}</h3>
            <h3><strong>Type:</strong> {cardData.type_line ?? "Not listed"}</h3>
            <h3><strong>Set:</strong> {cardData.set_name ?? "Not listed"}</h3>
            <h3><strong>Price:</strong> {cardData.prices?.usd ?? "Not listed"}</h3>
            <h3><strong>Artist:</strong> {cardData.artist ?? "Not listed"}</h3>
        </div>
    );
}
