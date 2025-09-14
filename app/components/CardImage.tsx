import { Card } from "@/app/types/card";

export default function CardImage( {cardData} : { cardData: Card }) {

    return (
    <div>
        {cardData && (
            <div>
                <img src={cardData.image_uris.small} alt={cardData.name}/>
            </div>
        )}
    </div>
    )
}