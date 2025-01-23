import { Router } from 'express';
import { link } from 'fs';
import passport from 'passport';
import { githubCallback, redirectToGitHub } from '../../controllers/services/github.controller';
import { discordServiceCallback, redirectToDiscordService } from '../../controllers/services/discord.controller';
import { trelloCallback, redirectToTrello } from '../../controllers/services/trello.controller';
import { redditCallback, redirectToReddit } from '../../controllers/services/reddit.controller';

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
linkRouter.get('/discord', redirectToDiscordService);

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
linkRouter.get('/discord/callback', discordServiceCallback);

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

/**
 * @swagger
 * /link/reddit:
 *   get:
 *     summary: Link reddit third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/reddit', redirectToReddit);

/**
 * @swagger
 * /link/reddit/callback:
 *   get:
 *     summary: Callback for reddit third-party account
 *     tags: [Link Accounts]
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Auth failed
 */
linkRouter.get('/reddit/callback', redditCallback);

/**
 * @swagger
 * /link/twitter:
 *  get:
 *    summary: Link Twitter third-party account
 *    tags: [Link Accounts]
 *    responses:
 *      200:
 *        description: Successfully authenticated
 *      401:
 *        description: Auth failed
 */
linkRouter.get('/twitter', passport.authenticate('twitter-link'));

/**
 * @swagger
 * /link/twitter/callback:
 *  get:
 *    summary: Callback for Twitter third-party account
 *    tags: [Link Accounts]
 *    responses:
 *      200:
 *        description: Successfully authenticated
 *      401:
 *        description: Auth failed
 */
linkRouter.get('/twitter/callback',
  passport.authenticate('twitter-link', { failureRedirect: '/login' }),
  (req, res) => {
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  }
);

/**
 * @swagger
 * /link/trello:
 *  get:
 *    summary: Link trello third-party account
 *    tags: [Link Accounts]
 *    responses:
 *      200:
 *        description: Successfully authenticated
 *      401:
 *        description: Auth failed
 */
linkRouter.get('/trello', redirectToTrello);

/**
 * @swagger
 * /link/trello/callback:
 *  get:
 *    summary: Callback for trello third-party account
 *    tags: [Link Accounts]
 *    responses:
 *      200:
 *        description: Successfully authenticated
 *      401:
 *        description: Auth failed
 */
linkRouter.get('/trello/callback', trelloCallback);


export default linkRouter;
