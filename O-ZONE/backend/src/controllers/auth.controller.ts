import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function registerUser(req: Request, res: Response) {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Password hashing failed' });
    }

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User registration failed' });
    }
  });
}

export function loginUser(req: Request, res: Response) {
  const user = req.user as User;
  const { password, ...userWithoutPassword } = user;
  const loggedUser = userWithoutPassword;

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );

  res.cookie('token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({
    user: loggedUser,
    token: token
  });
}

export function logoutUser(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    if (err) { return next(err); }
    res.clearCookie('token');
    res.redirect('/');
  });
}
