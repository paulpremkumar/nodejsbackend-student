"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
// services/auth.service.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
// services/auth.service.ts
//import prisma from '../lib/prisma';
const db_1 = require("../lib/db");
async function register(email, password) {
    // Check if user already exists
    const [existingRows] = await db_1.db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (existingRows.length > 0) {
        throw new Error('User already exists');
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Insert new user
    const [result] = await db_1.db.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return {
        id: result.insertId,
        email,
    };
}
async function login(email, password) {
    // Get the user by email
    const [rows] = await db_1.db.query('SELECT * FROM user WHERE email = ?', [email]);
    const users = rows;
    if (users.length === 0) {
        throw new Error('User not found');
    }
    const user = users[0];
    // Compare the password
    const isMatch = await bcrypt_1.default.compare(password, user.password);
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
