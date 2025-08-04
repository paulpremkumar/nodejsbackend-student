// models/user.model.ts
export interface User {
    id: number;
    email: string;
    password: string; // hashed
}

export const users: User[] = []; // Replace with DB integration later
