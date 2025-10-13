import { Card } from "../types/card";
import { setCards } from '../types/setCards';
import { useState } from 'react';

export default function CardImage( {cardData, isSearchPage, currentCard} : { cardData: any, isSearchPage: boolean, currentCard: number  } ) {
    console.log('currentCard:', currentCard); 
    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ position: 'relative' }}
        >
            {cardData?.data?.[currentCard] && 
                <div style={isHovering && !isSearchPage ? { position: 'absolute', zIndex: 50, transform: 'scale(1.3)' } : {}}>
                    {isSearchPage ? (
                    <img src={cardData.data[currentCard].image_uris?.normal} alt={cardData.data[currentCard].name} style={{ transform: 'scale(0.6)' }}/>
                    ) : (
                    <img src={isHovering ? cardData.data[currentCard].image_uris?.large : cardData.data[currentCard].image_uris?.small} alt={cardData.data[currentCard].name}/>
                    )}
                </div>
            }
        </div>
    )
}