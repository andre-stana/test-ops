import { prisma } from "../config/prisma";
import { ReactionPayload } from "../types/reaction";

// Ajouter une nouvelle réaction
export const addReaction = async (name: string, description: string, service: string) => {
  const data: any = {
    name,
    description,
    service,
  };

  return await prisma.reaction.create({ data });
};

// Mettre à jour une réaction
export const updateReaction = async (id: number, name: string, description: string, service: string) => {
  return await prisma.reaction.update({
    where: { id },
    data: {
      name,
      description,
      service,
    },
  });
};

// Récupérer toutes les réactions
export const getAllReactions = async () => {
  return await prisma.reaction.findMany();
};

// Récupérer une réaction par ID
export const getReactionById = async (id: number) => {
  return await prisma.reaction.findUnique({
    where: { id },
  });
};
