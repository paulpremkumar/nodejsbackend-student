// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routers/auth.router';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: false,
}));
app.use('/api/auth', authRoutes);

export default app;
