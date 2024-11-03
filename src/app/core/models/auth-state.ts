// src/app/core/models/auth-state.ts
import { User } from './login-request';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}