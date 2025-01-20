import { config } from 'dotenv';

config();

const API_URL = process.env.API_URL!;
const API_PORT = process.env.API_PORT!;

if (!API_URL || !API_PORT) {
  throw new Error('API_URL and API_PORT must be provided');
}

export const DISCORD_CONFIG = {
  clientId: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  callbackURL: `${API_URL!}:${API_PORT!}/api/auth/discord/callback`,
  scope: [
    'identify',
    'email',
  ]
};

export const DISCORD_SERVICE_CONFIG = {
  clientId: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  callbackURL: `${API_URL}:${API_PORT}/api/link/discord/callback`,
  scope: [
    'identify',
    'email',
  ]
};
