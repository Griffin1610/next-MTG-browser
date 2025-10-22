import { imageUris } from "@/app/types/imageUris";

export type setCards = {
    id: string;
    name: string;
    image_uris?: imageUris;
    cmc?: number;
    rarity?: 'common' | 'uncommon' | 'rare' | 'mythic';
    prices?: { usd?: string };
    colors?: string[];
};