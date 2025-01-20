import { prisma } from "../config/prisma";

// Ajouter une nouvelle zone
export const addArea = async (name: string, description: string, userId: number, actionId: number, reactionId: number) => {
  const area = await prisma.area.create({
    data: {
      name,
      description,
      actionId,
      reactionId,
      userId,
    },
  });

  return area;
};

// Mettre à jour une zone
export const updateArea = async (id: number, name: string, description: string, userId: number, actionId: number, reactionId: number) => {
  return await prisma.area.update({
    where: { id },
    data: {
      name,
      description,
      userId,
      actionId,
      reactionId,
    },
  });
};

// Récupérer toutes les zones
export const getAllAreas = async () => {
  return await prisma.area.findMany();
};

// Récupérer une zone par ID
export const getAreaById = async (id: number) => {
  return await prisma.area.findUnique({
    where: { id },
  });
};
