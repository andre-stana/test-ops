import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import { prisma } from '../config/prisma';
import { User } from '@prisma/client';
import { ReactionPayload } from '../types/reaction';

async function googleTrigger(req: Request, res: Response, eventEmitter: EventEmitter) {
    const event = req.headers['x-google-event'] as string;

    console.log("Gmail Webhook Received");
    res.status(200).send("ok");
    console.log(req.body);

    const { message } = req.body;

    if (!message || !message.data) {
      console.log("No message data found");
      return;
    }

    const encodedMessage = message.data;
    const decodedMessage = JSON.parse(
      Buffer.from(encodedMessage, "base64").toString("utf-8")
    );
    console.log("Decoded Message: ", decodedMessage);

    const payload = req.body;

    if (!event) {
        console.error('No Google event found in headers');
        res.status(200).send("ok");
        return;
    }

    const googleUserId = payload.sender.id; // Google user ID

    if (!googleUserId) {
        console.error('No Google user ID found in payload');
        res.sendStatus(400);
        return;
    }

    const users = await prisma.user.findMany({
        where: {
            services: {
                some: {
                    serviceId: googleUserId.toString(),
                    serviceName: "google",
                },
            },
        },
        include: {
            services: true,
        },
    });

    users.forEach(async (user: User) => {

        if (!user) {
            console.error('User not found');
            res.sendStatus(404);
            return;
        }

        const areas = await prisma.area.findMany({
            where: {
                userId: user.id,
                action: {
                    name: {
                        startsWith: `${event}`,
                    },
                    service: 'google',
                },
            },
            include: {
                reaction: true,
            },
        });

        areas.forEach(async (area) => {
            const reactionPayload: ReactionPayload = {
                userId: user.id,
                reactionId: area.reaction.id,
                webhookURL: area.reaction.webhookURL || '',
            };

            if (reactionPayload) {
                eventEmitter.emit('reaction', reactionPayload);
                console.log('Event emitted');
            }
        });

        res.sendStatus(200);
    });
}

export default googleTrigger;