import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function parseCookies(cookieArray: string[]): Record<string, string> {
  const cookies: Record<string, string> = {};
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key.trim()] = value;
  });
  return cookies;
}

function getcookie(req: Request): Record<string, string> {
  const cookie: string | undefined = req.headers.cookie;
  if (!cookie) {
    return {};
  }
  return parseCookies(cookie.split('; '));
}

export const authenticateJWT: RequestHandler = (req, res, next) => {
  const cookies = getcookie(req);
  let token = cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' }); // No token provided
    return;
  }

  const jwtSecret = process.env.JWT_SECRET!;

  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' }); // Invalid token
      return;
    }

    req.user = user;
    next();
  });
};

