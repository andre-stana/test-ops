import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../../config/prisma';
import { User, UserService, Prisma } from '@prisma/client';
import { UserWithServices } from '../../types/types';
import { GOOGLE_CONFIG } from '../../config/services/google.config';

dotenv.config();

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CONFIG.clientId,
    clientSecret: GOOGLE_CONFIG.clientSecret,
    callbackURL: GOOGLE_CONFIG.callbackURL,
    scope: GOOGLE_CONFIG.scope,
  },
  async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    try {
      // Check if user exists
      let user: User | null = await prisma.user.findUnique({
        where: {
          email: profile.emails?.[0].value!,
        },
        include: {
          services: true,
        },
      });

      if (!user) {
        // Create a new user if not found
        user = await prisma.user.create({
          data: {
            email: profile.emails?.[0].value!,
            name: profile.displayName,
            services: {
              create: {
                serviceId: profile.id.toString(),
                serviceName: 'google',
                accessToken: accessToken,
                refreshToken: refreshToken || '',
              },
            },
          },
        });
      } else {
        // Check if the user already has a Google service linked
        const googleService = (user as UserWithServices).services.find(
          (service: UserService) => service.serviceName === 'google'
        );

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
        } else {
          // If the user has a Google service linked, update tokens
          await prisma.userService.update({
            where: {
              id: googleService.id
            },
            data: {
              accessToken: accessToken,
              refreshToken: refreshToken || '',
            },
          });
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

export default googleStrategy;
