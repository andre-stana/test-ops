import { Request, Response } from 'express';
import { prisma } from "../config/prisma";
import { UserWithServices } from "../types/types";
import { UserService } from "@prisma/client";

export async function getAllServices() {
  return await prisma.userService.findMany();
}

export async function getAllUserServicesByUserId(id: number) {
  return await prisma.userService.findMany({
    where: {
      userId: id,
    },
  });
}
export async function unlinkUserService(req: Request, res: Response) {
  const { name } = req.params;

  const serviceName = name as string;

  if (!serviceName) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = req.user as UserWithServices;

  const userService = await prisma.userService.findFirst({
    where: {
      userId: user.id,
      serviceName: serviceName
    }
  });

  if (!userService) {
    return res.status(404).json({ error: `${serviceName} service not linked` });
  }

  // Delete the user service link from the database
  await prisma.userService.delete({
    where: {
      userId_serviceId_serviceName: {
        userId: user.id,
        serviceId: userService.serviceId,
        serviceName: serviceName,
      },
    },
  });

  res.status(200).json({ message: `${serviceName} service unlinked successfully` });
}
