import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { prisma } from '../config/prisma';

type Action = {
  name: string;
  description: string;
}

type Reaction = {
  name: string;
  description: string;
}

type Service = {
  name: string;
  actions: Action[];
  reactions: Reaction[];
}

type AboutJson = {
  client: {
    host: string;
  };
  server: {
    current_time: number;
    services: Service[];
  };
}

export async function getAboutInfo(req: Request, res: Response) {
  const actions = await prisma.action.findMany();
  const reactions = await prisma.reaction.findMany();

  const serviceMap: Record<string, Service> = {};

  actions.forEach((action) => {
    if (!serviceMap[action.service]) {
      serviceMap[action.service] = { name: action.service, actions: [], reactions: [] };
    }
    serviceMap[action.service].actions.push({
      name: action.name,
      description: action.description,
    });
  });

  reactions.forEach((reaction) => {
    if (!serviceMap[reaction.service]) {
      serviceMap[reaction.service] = { name: reaction.service, actions: [], reactions: [] };
    }
    serviceMap[reaction.service].reactions.push({
      name: reaction.name,
      description: reaction.description,
    });
  });

  const services = Object.values(serviceMap);

  const clientIp = req.ip?.split(':').pop();

  if (!clientIp) {
    res.status(500).json({ error: 'Failed to get client IP' });
    return;
  }

  const response: AboutJson = {
    client: {
      host: clientIp,
    },
    server: {
      current_time: Date.now(),
      services,
    },
  };

  res.json(response);
};
