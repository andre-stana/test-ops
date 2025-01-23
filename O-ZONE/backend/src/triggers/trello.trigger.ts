import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import { prisma } from '../config/prisma';
import { ReactionPayload } from '../types/reaction';

async function trelloTrigger(req: Request, res: Response, eventEmitter: EventEmitter) {
    console.log('Received Trello Webhook');

    const event = req.headers['x-trello-event'] as string;
    const payload = req.body;

    if (!event) {
        console.error('No Trello event found in headers');
        res.sendStatus(400);
        return;
    }

    const trelloUserId = payload.action.memberCreator.id; // Trello user ID

    if (!trelloUserId) {
        console.error('No Trello user ID found in payload');
        res.sendStatus(400);
        return;
    }

    const users = await prisma.user.findMany({
        where: {
            services: {
                some: {
                    serviceId: trelloUserId.toString(),
                    serviceName: "trello",
                },
            }
        },
        include: {
            services: true,
        },
    });

    users.forEach(async (user) => {
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
                    service: 'trello',
                },
            },
            include: {
                action: true,
                reaction: true,
            },
        });

        areas.forEach(async (area) => {
            if (!area) {
                console.error('Area not found');
                res.sendStatus(404);
                return;
            }

            const payload: ReactionPayload = {
                userId: user.id,
                reactionId: area.reaction.id,
                event: event || '',
                webhookURL: area.reaction.webhookURL || '',
            };

            eventEmitter.emit(`reaction:trello:${area.reaction.name}`, payload);
        });

    });

    res.sendStatus(200);

};

export default trelloTrigger;