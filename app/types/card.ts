import { imageUris } from "@/app/types/imageUris";

export type Card = {
    id: string;
    name: string;
    cmc?: number;
    colors: string[];
    image_uris: imageUris;
    card_faces?: { image_uris: { small: string , normal: string, large: string } }[];
    type_line?: string;
    set_name?: string;
    prices?: { usd: string };
    foil?: boolean;
    artist?: string;
};