import dotenv from 'dotenv';
import { DISCORD_SERVICE_CONFIG } from '../../config/services/discord.config';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { prisma } from '../../config/prisma';
import { User } from '@prisma/client';
import { Request } from 'express';

dotenv.config();

const discordServiceStrategy = new DiscordStrategy(
  {
    clientID: DISCORD_SERVICE_CONFIG.clientId,
    clientSecret: DISCORD_SERVICE_CONFIG.clientSecret,
    callbackURL: DISCORD_SERVICE_CONFIG.callbackURL,
    scope: DISCORD_SERVICE_CONFIG.scope,
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

      console.log('User:', user.id);

      // Check if the user already has a Discord service linked
      let discordService = await prisma.userService.findUnique({
        where: {
          userId_serviceId_serviceName: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'discord',
          },
        },
      });

      console.log('Discord Service:', discordService);

      if (!discordService) {
        // If the user does not have a Discord service linked, create one
        await prisma.userService.create({
          data: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'discord',
            accessToken: accessToken,
            refreshToken: refreshToken || '',
          },
        });
        return done(null, user);
      }

      // If the user has a Discord service linked, update tokens
      await prisma.userService.update({
        where: {
          id: discordService.id,
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

export default discordServiceStrategy;
