// src/app/core/models/login-request.ts
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}