import { imageUris } from "@/app/types/imageUris";

export type Card = {
    name: string;
    cmc: number;
    colors: string[];
    image_uris: imageUris;
};