// services/auth.service.ts
import bcrypt from 'bcrypt';
import { users, User } from '../models/user.model';
// services/auth.service.ts
import prisma from '../lib/prisma';

export async function register(email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashed
        }
    });

    return newUser;
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Incorrect password');

    return user;
}