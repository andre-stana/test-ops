import { config } from 'dotenv';

config();

const API_URL = process.env.API_URL!;
const API_PORT = process.env.API_PORT!;

if (!API_URL || !API_PORT) {
  throw new Error('API_URL and API_PORT must be provided');
}

export const SPOTIFY_SERVICE_CONFIG = {
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  callbackURL: `${API_URL!}:${API_PORT!}/api/link/spotify/callback`,
  scope: ['user-read-email', 'user-read-private'],
};

