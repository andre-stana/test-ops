import dotenv from 'dotenv';
import { Strategy as TwitterStrategy, Profile } from 'passport-twitter';
import { prisma } from '../../config/prisma';
import { User } from '@prisma/client';
import { Request } from 'express';

dotenv.config();

const twitterServiceStrategy = new TwitterStrategy(
    {
        consumerKey: process.env.TWITTER_CONSUMER_KEY!,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
        callbackURL: `${process.env.API_URL}:${process.env.API_PORT}/api/link/twitter/callback`,
        passReqToCallback: true,
    },
    async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void
    ) => {
        try {
            const user = req.user as User;

            if (!user) {
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
                return done(new Error('User not found in database'), false);
            }

            // Check if the user already has a X service linked
            let twitterService = await prisma.userService.findUnique({
                where: {
                    userId_serviceId_serviceName: {
                        userId: user.id,
                        serviceId: profile.id.toString(),
                        serviceName: 'twitter',
                    },
                },
            });

            if (!twitterService) {
                // If the user does not have a X service linked, create one
                await prisma.userService.create({
                    data: {
                        userId: user.id,
                        serviceId: profile.id.toString(),
                        serviceName: 'twitter',
                        accessToken: accessToken,
                        refreshToken: refreshToken || '',
                    },
                });
                return done(null, user);
            }

            // If the user has a X service linked, update tokens
            await prisma.userService.update({
                where: {
                    id: twitterService.id,
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

export default twitterServiceStrategy;
