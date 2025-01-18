import dotenv from 'dotenv';
import { GOOGLE_SERVICE_CONFIG } from '../../config/services/google.config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../../config/prisma';
import { User } from '@prisma/client';
import { Request } from 'express';

dotenv.config();

const googleServiceStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_SERVICE_CONFIG.clientId,
    clientSecret: GOOGLE_SERVICE_CONFIG.clientSecret,
    callbackURL: GOOGLE_SERVICE_CONFIG.callbackURL,
    scope: GOOGLE_SERVICE_CONFIG.scope,
    passReqToCallback: true,
  },
  async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
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

      // Check if the user already has a Google service linked
      let googleService = await prisma.userService.findUnique({
        where: {
          userId_serviceId_serviceName: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'google',
          },
        },
      });

      if (!googleService) {
        // If the user does not have a Google service linked, create one
        await prisma.userService.create({
          data: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'google',
            accessToken: accessToken,
            refreshToken: refreshToken || '',
          },
        });
        return done(null, user);
      }

      // If the user has a Google service linked, update tokens
      await prisma.userService.update({
        where: {
          id: googleService.id,
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

export default googleServiceStrategy;
