import { Router } from 'express';
import { getUserRepositories, setGithubWebhook } from '../controllers/services/github.controller';

export const githubRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Github
 *   description: API for github api actions
 */

/**
 * @swagger
 * /github/repositories/set-webhook:
 *   post:
 *     summary: Create a GitHub webhook for a repository
 *     description: Creates a webhook on the specified GitHub repository using the user's stored access token.
 *     tags:
 *       - Github
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
 *               repositoryName:
 *                 type: string
 *                 description: The GitHub repository name in the format "owner/repo".
 *                 example: octocat/Hello-World
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
 *                   description: The created webhook details returned from GitHub.
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
githubRouter.post('/repositories/set-webhook', setGithubWebhook);

/**
 * @swagger
 * /github/repositories/{userId}:
 *   get:
 *     summary: Get all repositories for a user
 *     description: Retrieves a list of all repository names for the specified user using their GitHub access token.
 *     tags:
 *       - Github
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose repositories are being fetched.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Repositories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 repositories:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Hello-World"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required userId
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
githubRouter.get('/repositories/:id', getUserRepositories);
