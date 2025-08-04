// config/env.ts
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the .env file');
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
