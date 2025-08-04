// controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';
import { generateToken } from '../utils/jwt';

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await AuthService.register(email, password);
        const token = generateToken({ id: user.id, email: user.email });
        res.status(201).json({ user: { id: user.id, email: user.email }, token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await AuthService.login(email, password);
        const token = generateToken({ id: user.id, email: user.email });
        res.json({ user: { id: user.id, email: user.email }, token });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
}
