import { Card } from "@/app/types/card";

export default function CardStats({ cardData } : { cardData: Card }) {

return(
    <>
        {cardData && (
        <div>
            <>
                <h3>Name: {cardData.name}</h3>
                <h3>CMC: {cardData.cmc}</h3>
                <h3>Color: {cardData.colors[0]}</h3>
            </>
        </div>
        )}
    </>
    )
}