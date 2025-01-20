import dotenv from 'dotenv';
import { SPOTIFY_SERVICE_CONFIG } from '../../config/services/spotify.config';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { prisma } from '../../config/prisma';
import { User } from '@prisma/client';
import { Request } from 'express';

dotenv.config();

const spotifyServiceStrategy = new SpotifyStrategy(
  {
    clientID: SPOTIFY_SERVICE_CONFIG.clientId,
    clientSecret: SPOTIFY_SERVICE_CONFIG.clientSecret,
    callbackURL: SPOTIFY_SERVICE_CONFIG.callbackURL,
    scope: SPOTIFY_SERVICE_CONFIG.scope,
    passReqToCallback: true,
  },
  async (req: Request, accessToken: string, refreshToken: string, expires_in: any, profile: any, done: (error: any, user?: any) => void) => {
    try {
      const user = req.user as User;

      if (!req.user) {
        return done(new Error('User not found in request'), false);
      }

      // Check if user exists
      const isUser: User | null = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        include: {
          services: true,
        },
      });

      if (!isUser) {
        done(new Error('User not found in database'), false);
      }

      // Check if the user already has a Spotify service linked
      let spotifyService = await prisma.userService.findUnique({
        where: {
          userId_serviceId_serviceName: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'spotify',
          },
        },
      });

      if (!spotifyService) {
        // If the user does not have a Spotify service linked, create one
        await prisma.userService.create({
          data: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'spotify',
            accessToken: accessToken,
            refreshToken: refreshToken || '',
          },
        });
        return done(null, user);
      }

      // If the user has a Spotify service linked, update tokens
      await prisma.userService.update({
        where: {
          id: spotifyService.id,
        },
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken || '',
        },
      });

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

export default spotifyServiceStrategy;
