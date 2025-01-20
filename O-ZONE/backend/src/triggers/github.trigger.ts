import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import { prisma } from '../config/prisma';
import { fetchGithubUserEmailByToken } from '../utils/fetcher';
import { User, UserService } from '@prisma/client';
import { ReactionPayload } from '../types/reaction';

async function githubTrigger(req: Request, res: Response, eventEmitter: EventEmitter) {
  console.log('Received GitHub Webhook');

  const event = req.headers['x-github-event'] as string;
  const payload = req.body;

  if (!event) {
    console.error('No GitHub event found in headers');
    res.sendStatus(400);
    return;
  }

  const githubUserId = payload.sender.id; // GitHub user ID

  if (!githubUserId) {
    console.error('No GitHub user ID found in payload');
    res.sendStatus(400);
    return;
  }

  const users = await prisma.user.findMany({
    where: {
      services: {
        some: {
          serviceId: githubUserId.toString(),
          serviceName: "github",
        },
      }
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
          service: 'github',
        },
      },
      include: {
        action: true,
        reaction: true,
      },
    });

    console.log(areas);

    areas.forEach((area) => {
      const payload: ReactionPayload = {
        userId: user.id,
        reactionId: area.reaction.id,
        webhookURL: area.reaction.webhookURL || '',
        emailTo: user.email,
      };

      eventEmitter.emit(`reaction:${area.reaction.service}:${area.reaction.name}`, payload);
    });

  });
  res.sendStatus(200);
};

export default githubTrigger;
