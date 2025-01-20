import dotenv from 'dotenv';
import { prisma } from '../../config/prisma';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { User, UserService } from '@prisma/client';
import { UserWithServices } from '../../types/types';
import { DISCORD_CONFIG } from '../../config/services/discord.config';

dotenv.config();

const discordStrategy = new DiscordStrategy(
  {
    clientID: DISCORD_CONFIG.clientId,
    clientSecret: DISCORD_CONFIG.clientSecret,
    callbackURL: DISCORD_CONFIG.callbackURL,
    scope: DISCORD_CONFIG.scope,
  },
  async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    try {
      let email = profile.email;

      let user: User | null = await prisma.user.findUnique({
        where: { email },
        include: {
          services: true
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: profile.username,
            services: {
              create: {
                serviceId: profile.id.toString(),
                serviceName: 'discord',
                accessToken,
                refreshToken: refreshToken || '',
              },
            },
          },
        });
      } else {
        // Check if the user already has a Discord service linked
        const discordService = (user as UserWithServices).services.find(
          (service: UserService) => service.serviceName === 'discord'
        );

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
        } else {
          // If the user has a Discord service linked, update tokens
          await prisma.userService.update({
            where: {
              id: discordService.id
            },
            data: {
              accessToken: accessToken,
              refreshToken: refreshToken || '',
            },
          });
        }
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

export default discordStrategy;
