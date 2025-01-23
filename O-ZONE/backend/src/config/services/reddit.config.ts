import { config } from 'dotenv';

config();

const API_URL = process.env.API_URL!;
const API_PORT = process.env.API_PORT!;

if (!API_URL || !API_PORT) {
  throw new Error('API_URL and API_PORT must be provided');
}

export const REDDIT_SERVICE_CONFIG = {
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  callbackURL: `${API_URL!}:${API_PORT!}/api/link/reddit/callback`,
  userAgent: `${process.env.REDDIT_USER_AGENT}/1.0`,
  scope: ['identity', 'edit', 'flair', 'history', 'read', 'vote', 'wikiread', 'wikiedit'],
};
