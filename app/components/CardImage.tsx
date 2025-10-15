import { useState } from 'react';

export default function CardImage( {cardData, isSearchPage, currentCard} : { cardData: any, isSearchPage: boolean, currentCard: number  } ) {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const imageSrc = isSearchPage
        ? (cardData?.data?.[currentCard]?.image_uris?.normal)
        //: (isHovering ? cardData?.data?.[currentCard]?.image_uris?.large : cardData?.data?.[currentCard]?.image_uris?.small);
        : (cardData?.data?.[currentCard]?.image_uris?.small)
        //removing hover effect for now, as it is buggy.
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