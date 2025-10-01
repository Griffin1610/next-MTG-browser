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
            {cardData ? ( 
                <div>
                    {isHovering ? (
                        <img src={cardData.image_uris?.normal} alt={cardData.name}  className="w-xs"/>
                    ) : (
                        <img src={cardData.image_uris?.small} alt={cardData.name} />
                    )}
                </div>
            ) : (
                <div className="bg-stone-800">
                    <p className="text-white">No card selected</p>
                </div>
            )
            }
        </div>
    )
}