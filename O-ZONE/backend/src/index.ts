import { config } from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './config/passport';
import mainRouter from './routes/routes';
import { prisma } from './config/prisma';
import { getAboutInfo } from './controllers/about.controller';
import { detectPlatform } from './middleware/plateform.middleware';
import { syncDatabase } from './utils/syncDatabase';

import { LaunchSpotifyLoop } from "./actions/spotify.action";

config();

declare global {
  namespace Express {
    interface Request {
      platform?: 'mobile' | 'web' | 'unknown';
    }
  }
}

export const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middleware for session handling
app.use(session({
  secret: process.env.API_SECRET || 'default',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.use(detectPlatform);

app.use('/api', mainRouter);
app.use('/about.json', getAboutInfo);

const PORT = process.env.API_PORT || 3000;

(async () => {
  try {
    await syncDatabase();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

prisma.$connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error: any) => {
    console.error("Error connecting to the database", error);
  });

LaunchSpotifyLoop();
