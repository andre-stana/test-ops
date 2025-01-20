import { config } from 'dotenv';

config();

const API_URL = process.env.API_URL!;
const API_PORT = process.env.API_PORT!;

if (!API_URL || !API_PORT) {
  throw new Error('API_URL and API_PORT must be provided');
}

export const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${API_URL!}:${API_PORT!}/api/auth/google/callback`,
  scope: ['profile', 'email'],
};

export const GOOGLE_SERVICE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${API_URL!}:${API_PORT!}/api/link/google/callback`,
  scope: ['profile', 'email'],
};
