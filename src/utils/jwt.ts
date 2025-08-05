import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';

export const generateToken: any = (payload: object, expiresIn = '1d') => {
    return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}
