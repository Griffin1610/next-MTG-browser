import { Card } from "@/app/types/card";

export default function CardStats({ cardData } : { cardData: Card }) {

  if (!cardData) {
    return <p>enter a card above to get started</p>;
  }

    return (
        <> 
            <div>
                <>
                    <h3>Name: {cardData.name ?? "N/A"}</h3>
                    <h3>CMC: {cardData.cmc ?? "N/A"}</h3>
                    <h3>Color: {cardData.colors?.[0] ?? "N/A"}</h3>
                </>
            </div>
        </>
        )
}