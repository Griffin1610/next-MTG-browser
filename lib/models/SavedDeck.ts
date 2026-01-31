import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISavedCard {
    id: string;
    name: string;
    image_uris: {
        small: string;
        normal: string;
        large: string;
    };
    rarity?: string;
    colors?: string[];
    type_line?: string;
    cmc?: number;
}

export interface ISavedDeck extends Document {
    userId: mongoose.Types.ObjectId;
    deckName: string;
    setName: string;
    cards: ISavedCard[];
    savedAt: Date;
}

const SavedCardSchema = new Schema<ISavedCard>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    image_uris: {
        small: { type: String, required: true },
        normal: { type: String, required: true },
        large: { type: String, required: true },
    },
    rarity: String,
    colors: [String],
    type_line: String,
    cmc: Number,
}, { _id: false });

const SavedDeckSchema = new Schema<ISavedDeck>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    deckName: {
        type: String,
        required: true,
        trim: true,
    },
    setName: {
        type: String,
        required: true,
    },
    cards: {
        type: [SavedCardSchema],
        required: true,
    },
    savedAt: {
        type: Date,
        default: Date.now,
    },
});

const SavedDeck: Model<ISavedDeck> = mongoose.models.SavedDeck || mongoose.model<ISavedDeck>('SavedDeck', SavedDeckSchema);

export default SavedDeck;
