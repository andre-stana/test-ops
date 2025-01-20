import dotenv from 'dotenv';
import { Request } from 'express';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { prisma } from '../../config/prisma';
import { User } from '@prisma/client';

dotenv.config();

const facebookServiceStrategy = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_APP_SECRET as string,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        passReqToCallback: true,
    },
    async ( req: Request,
            accessToken: string,
            refreshToken: string,
            profile: any,
    done: (error: any, user?: any) => void) => {
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

            // Check if the user already has a Facebook service linked
            let facebookService = await prisma.userService.findUnique({
                where: {
                    userId_serviceId_serviceName: {
                        userId: user.id,
                        serviceId: profile.id.toString(),
                        serviceName: 'facebook',
                    },
                },
            });

            console.log('Facebook Service:', facebookService);

            if (!facebookService) {
                // If the user does not have a Facebook service linked, create one
                await prisma.userService.create({
                    data: {
                        userId: user.id,
                        serviceId: profile.id.toString(),
                        serviceName: 'facebook',
                        accessToken: accessToken,
                        refreshToken: refreshToken || '',
                    },
                });
            }

            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }
);

export default facebookServiceStrategy;