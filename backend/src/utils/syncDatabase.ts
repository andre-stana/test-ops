import fs from 'fs/promises';
import path from "path";
import { prisma } from "../config/prisma";

const CONFIG_FILE = path.resolve(process.cwd(), 'config.json');

export const syncDatabase = async () => {
  try {
    const configData = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf-8'));
    const { services } = configData;

    for (const service of services) {
      const { name, actions, reactions } = service;

      // Sync actions
      for (const action of actions) {
        const existingAction = await prisma.action.findUnique({
          where: { name: action.name },
        });

        if (!existingAction) {
          await prisma.action.create({
            data: {
              name: action.name,
              description: action.description,
              service: name,
            },
          });
          console.log(`Action "${action.name}" created`);
        }
      }

      // Sync reactions
      for (const reaction of reactions) {
        const existingReaction = await prisma.reaction.findUnique({
          where: { name: reaction.name },
        });

        if (!existingReaction) {
          await prisma.reaction.create({
            data: {
              name: reaction.name,
              description: reaction.description,
              service: name,
            },
          });
          console.log(`Reaction "${reaction.name}" created`);
        }
      }
    }
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};
