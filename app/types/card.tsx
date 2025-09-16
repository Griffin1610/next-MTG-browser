import { imageUris } from "@/app/types/imageUris";

export type Card = {
    id: string;
    name: string;
    cmc: number;
    colors: string[];
    image_uris: imageUris;
    card_faces?: { image_uris: { small: string } }[];
};