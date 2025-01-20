import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import bcrypt from 'bcryptjs';

export async function getAllUsers(_: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getCurrentUser(id: number) {
  return await prisma.user.findUnique({
    where: {
      id
    },
  });
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;
  const { email, password, name } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
