// services/auth.service.ts
import bcrypt from 'bcrypt';
import { users, User } from '../models/user.model';
// services/auth.service.ts
//import prisma from '../lib/prisma';
import { db } from "../lib/db";
export async function register(email: string, password: string) {
    // Check if user already exists
    const [existingRows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

    if ((existingRows as any[]).length > 0) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return {
        id: (result as any).insertId,
        email,
    };
}



export async function login(email: string, password: string) {
    // Get the user by email
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    const users = rows as any[];

    if (users.length === 0) {
        throw new Error('User not found');
    }

    const user = users[0];

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    // Return user data (you might want to exclude password)
    return {
        id: user.id,
        email: user.email,
        // optionally return a JWT token or session data here
    };
}
