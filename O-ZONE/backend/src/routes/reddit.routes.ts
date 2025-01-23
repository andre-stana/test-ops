import { Router } from 'express';
import { getSubscribedSubreddits, setRedditWebhook } from '../controllers/services/reddit.controller';

export const redditRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Reddit
 *   description: API for reddit api actions
 */

/**
 * @swagger
 * /reddit/subreddit/set-webhook:
 *   post:
 *     summary: Create a Reddit webhook for a subreddit
 *     description: Creates a webhook on the specified subreddit using the user's stored access token.
 *     tags:
 *       - Reddit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user whose access token is stored in the database.
 *                 example: 1
 *               subredditName:
 *                 type: string
 *                 description: The name of the subreddit.
 *                 example: funny
 *               webhookUrl:
 *                 type: string
 *                 description: The URL for the webhook.
 *                 example: https://example.com/webhook
 *     responses:
 *       201:
 *         description: Webhook created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhook created successfully
 *                 data:
 *                   type: object
 *                   description: The created webhook details returned from Reddit.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required fields
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No user found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
redditRouter.post('/subreddit/set-webhook', setRedditWebhook);

/**
 * @swagger
 * /reddit/subreddit/{id}:
 *   get:
 *     summary: Get user subreddits
 *     description: Fetches the subreddits the user is subscribed to using their stored access token.
 *     tags:
 *       - Reddit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose access token is stored in the database.
 *     responses:
 *       200:
 *         description: Successfully fetched user subreddits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully fetched user subreddits
 *                 data:
 *                   type: object
 *                   description: The list of subreddits the user is subscribed to.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User does not have a Reddit access token
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No user found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
redditRouter.get('/subreddit/:id', getSubscribedSubreddits);
