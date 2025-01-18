import { prisma } from "../config/prisma";

// Ajouter une nouvelle action
export const addAction = async (name: string, description: string, service: string) => {
  return await prisma.action.create({
    data: {
      name,
      description,
      service,
    },
  });
};

// Mettre à jour une action
export const updateAction = async (id: number, name: string, description: string, service: string) => {
  return await prisma.action.update({
    where: { id },
    data: {
      name,
      description,
      service,
    },
  });
};

// Récupérer toutes les actions
export const getAllActions = async () => {
  return await prisma.action.findMany();
};

// Récupérer une action par ID
export const getActionById = async (id: number) => {
  return await prisma.action.findUnique({
    where: { id },
  });
};
