import { useState } from 'react';
import { Card } from "@/app/types/card";

type CardData = {
    total_cards: number;
    data: Card[];
    error?: string;
};

export default function CardImage( {cardData, isSearchPage, currentCard} : { cardData: CardData | null, isSearchPage: boolean, currentCard: number } ) {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const imageSrc = isSearchPage
        ? cardData?.data?.[currentCard]?.image_uris?.normal
        : cardData?.data?.[currentCard]?.image_uris?.small

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {cardData && 
                <div>
                    {isSearchPage ? (
                    <img src={imageSrc} alt={cardData.data?.[currentCard]?.name} style={{ transform: 'scale(0.6)' }}/>
                    ) : (
                    <img src={imageSrc} alt={cardData.data?.[currentCard]?.name}/>
                    )}
                </div>
            }
        </div>
    )
}
