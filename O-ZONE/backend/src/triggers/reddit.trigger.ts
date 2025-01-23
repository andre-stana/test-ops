import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import { prisma } from '../config/prisma';
import { User } from '@prisma/client';
import { ReactionPayload } from '../types/reaction';

async function redditTrigger(req: Request, res: Response, eventEmitter: EventEmitter) {
  console.log('Received Reddit Webhook');

  const payload = req.body;
  const event = req.body.type;

  console.log('Reddit Event:', event);
  console.log('Reddit Payload:', payload);

  if (!event) {
    console.error('No Reddit event found in headers');
    res.sendStatus(400);
    return;
  }

  const redditUserId = payload.user_id;

  if (!redditUserId) {
    console.error('No Reddit user ID found in payload');
    res.sendStatus(400);
    return;
  }

  const users = await prisma.user.findMany({
    where: {
      services: {
        some: {
          serviceId: redditUserId.toString(),
          serviceName: "reddit",
        },
      },
    },
    include: {
      services: true,
    },
  });

  if (!users.length) {
    console.error('No user found for Reddit ID');
    res.sendStatus(404);
    return;
  }

  users.forEach(async (user: User) => {

    const areas = await prisma.area.findMany({
      where: {
        userId: user.id,
        action: {
          name: {
            startsWith: `${event}`,
          },
          service: 'reddit',
        },
      },
      include: {
        action: true,
        reaction: true,
      },
    });

    if (!areas.length) {
      console.error('No areas found for Reddit event');
      return;
    }

    areas.forEach((area) => {
      const payload: ReactionPayload = {
        userId: user.id,
        reactionId: area.reaction.id,
        event: event || '',
        webhookURL: area.reaction.webhookURL || '',
        emailTo: user.email,
      };

      // Emit the event based on the reaction
      eventEmitter.emit(`reaction:${area.reaction.service}:${area.reaction.name}`, payload);
    });

  });

  // Respond back with success
  res.sendStatus(200);
};

export default redditTrigger;
