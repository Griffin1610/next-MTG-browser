import { Card } from "@/app/types/card";

type CardData = {
    total_cards: number;
    data: Card[];
    error?: string;
};

export default function CardImage( {cardData, isSearchPage, currentCard} : { cardData: CardData | null, isSearchPage: boolean, currentCard: number } ) {
    const card = cardData?.data?.[currentCard];
    const imageSrc = card?.image_uris
        ? (isSearchPage ? card.image_uris.normal : card.image_uris.small)
        : (card?.card_faces?.[0]?.image_uris?.normal ?? null)

    return (
        <div>
            {cardData && 
                <div>
                    {isSearchPage ? (
                    <img src={imageSrc ?? ""} alt={cardData.data?.[currentCard]?.name} style={{ transform: 'scale(0.6)' }}/>
                    ) : (
                    <img src={imageSrc ?? ""} alt={cardData.data?.[currentCard]?.name}/>
                    )}
                </div>
            }
        </div>
    )
}
