import { Router } from 'express';
import { getUserPlaylists } from "../controllers/services/spotify.controller";

export const SpotifyRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Spotify
 *   description: API for Spotify API actions
 */

/**
 * @swagger
 * /spotify/playlists:
 *   get:
 *     summary: Get user's Spotify playlists
 *     description: Get a list of the user's Spotify playlists.
 *     tags: [Spotify]
 *     responses:
 *       200:
 *         description: Successfully fetched the user's playlists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 * 
 *       400:
 *         description: Bad request. Missing parameters.
 *         content:
 *           text/plain:
 *             example: "Missing parameters"
 * 
 *       404:
 *         description: User or Spotify service not found.
 *         content:
 *           text/plain:
 *             examples:
 *               userNotFound:
 *                 summary: User not found
 *                 value: "User not found"
 *               serviceNotFound:
 *                 summary: Spotify service not found
 *                 value: "Spotify service not found"
 * 
 *       500:
 *         description: Internal server error while fetching the user's playlists.
 *         content:
 *           text/plain:
 *             example: "Error fetching the user's playlists"
 */

SpotifyRouter.get('/playlists', getUserPlaylists);


