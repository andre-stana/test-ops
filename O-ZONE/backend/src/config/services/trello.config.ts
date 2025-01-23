import { config } from 'dotenv';

config();

const API_URL = process.env.API_URL!;
const API_PORT = process.env.API_PORT!;

if (!API_URL || !API_PORT) {
  throw new Error('API_URL and API_PORT must be provided');
}

export const TRELLO_SERVICE_CONFIG = {
  clientId: process.env.TRELLO_CLIENT_ID!,
  clientSecret: process.env.TRELLO_CLIENT_SECRET!,
  callbackURL: `${API_URL!}:${API_PORT!}/api/link/trello/callback`,
  scope: ["read%3Ame","write%3Aboard"],
};