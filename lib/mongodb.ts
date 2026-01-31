import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = (global as Record<string, unknown>).mongoose as {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
} | undefined;

if (!cached) {
    cached = { conn: null, promise: null };
    (global as Record<string, unknown>).mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        cached!.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default dbConnect;
