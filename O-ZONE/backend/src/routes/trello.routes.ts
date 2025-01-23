import { Router } from "express";
import { getUserBoards, setTrelloWebhook } from "../controllers/services/trello.controller";

export const trelloRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Trello
 *   description: API for Trello API actions
 */

/**
 * @swagger
 * /boards/set-webhook:
 *   post:
 *     summary: Set a Trello webhook for a board
 *     description: Sets a webhook for a specific Trello board using the user's credentials and a callback URL.
 *     tags:
 *       - Trello
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user.
 *                 example: "123456"
 *               repositoryName:
 *                 type: string
 *                 description: The name of the Trello board where the webhook will be set.
 *                 example: "My Trello Board"
 *               webhookUrl:
 *                 type: string
 *                 description: The callback URL where Trello will send webhook events.
 *                 example: "https://example.com/api/trello/webhook"
 *     responses:
 *       200:
 *         description: Successfully set the Trello webhook.
 *         content:
 *           text/plain:
 *             example: "Webhook set successfully"
 *       400:
 *         description: Bad request. Missing parameters.
 *         content:
 *           text/plain:
 *             example: "Missing parameters"
 *       404:
 *         description: User or Trello service not found.
 *         content:
 *           text/plain:
 *             examples:
 *               userNotFound:
 *                 summary: User not found
 *                 value: "User not found"
 *               serviceNotFound:
 *                 summary: Trello service not found
 *                 value: "Trello service not found"
 *       500:
 *         description: Internal server error while setting the webhook.
 *         content:
 *           text/plain:
 *             example: "Error setting the webhook"
 */
trelloRouter.post('/boards/set-webhook', setTrelloWebhook);

/**
 * @swagger
 * /boards/get:
 *   post:
 *     summary: Get Trello boards of a user
 *     description: Fetches the list of Trello boards associated with a specific user using their userId.
 *     tags:
 *       - Trello
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successfully fetched the user's Trello boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the board.
 *                     example: "60f1a19f8efb9b2381f3c123"
 *                   name:
 *                     type: string
 *                     description: The name of the board.
 *                     example: "My Trello Board"
 *                   url:
 *                     type: string
 *                     description: The URL of the Trello board.
 *                     example: "https://trello.com/b/abcd1234"
 *       400:
 *         description: Bad request. Missing parameters.
 *         content:
 *           text/plain:
 *             example: "Missing parameters"
 *       404:
 *         description: User or Trello service not found.
 *         content:
 *           text/plain:
 *             examples:
 *               userNotFound:
 *                 summary: User not found
 *                 value: "User not found"
 *               serviceNotFound:
 *                 summary: Trello service not found
 *                 value: "Trello service not found"
 *       500:
 *         description: Internal server error while fetching Trello boards.
 *         content:
 *           text/plain:
 *             example: "Error fetching the user data"
 */
trelloRouter.post('/boards/get', getUserBoards);