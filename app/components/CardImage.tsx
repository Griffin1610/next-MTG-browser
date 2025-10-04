import { Card } from "../types/card";
import { useState } from 'react';

export default function CardImage( {cardData, isSearchPage, currentCard} : { cardData: Card, isSearchPage: boolean, currentCard: number  } ) {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const imageSrc = isSearchPage
        ? (cardData?.data?.[currentCard].image_uris?.normal)
        : (isHovering ? cardData.data?.[currentCard].image_uris?.large : cardData?.data?.[currentCard].image_uris?.small);

    return (
        <div
            onMouseEnter = {onMouseEnter}
            onMouseLeave = {onMouseLeave}
        >
            {cardData && 
                <div>
                    {isSearchPage ? (
                    <img src={imageSrc} alt={cardData.data?.[currentCard].image_uris.name} style={{ transform: 'scale(0.6)' }}/>
                    ) : (
                    <img src={imageSrc} alt={cardData.data?.[currentCard].image_uris.name}/>
                    )}
                </div>
            }
        </div>
    )
}