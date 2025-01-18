import { Router, Request, Response, NextFunction } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import { User } from '@prisma/client';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication routes
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Start the Google OAuth process
 *     description: Redirects the user to Google for authentication.
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Handle the Google OAuth callback
 *     description: Handles the callback after Google has authenticated the user.
 *     responses:
 *       302:
 *         description: Redirect to home on successful authentication
 *       401:
 *         description: Unauthorized - Failed authentication
 */
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {

    const isUser = req.user as User | null;

    if (!isUser) {
      res.status(400).json({ error: 'User is not found in the request body' });
      return;
    }

    // Cast user to User type
    const user: User = isUser;

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}overview`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/overview`);
  }
);

/**
 * @swagger
 * /auth/discord:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Start the Discord OAuth process
 *     description: Redirects the user to Discord for authentication.
 *     responses:
 *       302:
 *         description: Redirect to Discord OAuth
 */
authRouter.get('/discord', passport.authenticate('discord', { scope: ['identify', 'guilds', 'email'] }));

/**
 * @swagger
 * /auth/discord/callback:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Handle the Discord OAuth callback
 *     description: Handles the callback after Discord has authenticated the user.
 *     responses:
 *       302:
 *         description: Redirect to home on successful authentication
 *       401:
 *         description: Unauthorized - Failed authentication
 */
authRouter.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    const isUser = req.user as User | null;

    if (!isUser) {
      res.status(400).json({ error: 'User is not found in the request body' });
      return;
    }

    // Cast user to User type
    const user: User = isUser;

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}overview`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/overview`);
  }
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *       500:
 *         description: User registration failed
 */
authRouter.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                 token:
 *                   type: string
 *                   example: jwt_token
 *       400:
 *         description: Something is not right
 */
authRouter.post('/login', passport.authenticate('local'), loginUser);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Logout the user
 *     description: Logs out the user and redirects to the home page.
 *     responses:
 *       302:
 *         description: Redirect to home page
 */
authRouter.get('/logout', logoutUser);

export default authRouter;
