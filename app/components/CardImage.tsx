import { Card } from "@/app/types/card";
import { useState } from 'react';

export default function CardImage( {cardData} : { cardData: Card }) {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    return (
        <div
            onMouseEnter = {onMouseEnter}
            onMouseLeave = {onMouseLeave}
        >
            {cardData && 
                <div>
                    {isHovering ? (
                        <img src={cardData.image_uris?.large} alt={cardData.name} />
                    ) : (
                        <img src={cardData.image_uris?.small} alt={cardData.name} />
                    )}
                </div>
            }
        </div>
    )
}