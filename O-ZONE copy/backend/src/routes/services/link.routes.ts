import { Router } from 'express';
import passport from 'passport';
import { githubCallback, redirectToGitHub } from '../../controllers/services/github.controller';

const linkRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Link Accounts
 *   description: Endpoints for linking third-party accounts
 */

/**
 * @swagger
 * /link/google:
 *   get:
 *     summary: Link Google third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/google', passport.authenticate('google-link', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /link/google/callback:
 *   get:
 *     summary: Callback for Google third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/google/callback',
  passport.authenticate('google-link', { failureRedirect: '/login' }),
  (req, res) => {
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  }
);

/**
 * @swagger
 * /link/github:
 *   get:
 *     summary: Link GitHub third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/github', redirectToGitHub);

/**
 * @swagger
 * /link/github/callback:
 *   get:
 *     summary: Callback for GitHub third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/github/callback', githubCallback);

/**
 * @swagger
 * /link/discord:
 *   get:
 *     summary: Link Discord third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/discord', passport.authenticate('discord-link', { scope: ['email'] }));

/**
 * @swagger
 * /link/discord/callback:
 *   get:
 *     summary: Callback for Discord third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/discord/callback',
  passport.authenticate('discord-link', { failureRedirect: '/login' }),
  (req, res) => {
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  }
);

/**
 * @swagger
 * /link/spotify:
 *   get:
 *     summary: Link Spotify third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/spotify', passport.authenticate('spotify-link', { scope: ['user-read-email', 'user-read-private'] }));

/**
 * @swagger
 * /link/spotify/callback:
 *   get:
 *     summary: Callback for SPotify third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/spotify/callback',
  passport.authenticate('spotify-link', { failureRedirect: '/login' }),
  (req, res) => {
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  }
);

export default linkRouter;
