import { SPOTIFY_SERVICE_CONFIG } from '../../config/services/spotify.config';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { prisma } from '../../config/prisma';

config();

export async function getUserPlaylists(req: Request, res: Response): Promise<void> {
    const { userId } = req.body;

    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                services: true,
            },
        });
        
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const spotifyService = await prisma.userService.findUnique({
            where: {
                userId_serviceId_serviceName: {
                    userId: user.id,
                    serviceId: SPOTIFY_SERVICE_CONFIG.clientId,
                    serviceName: 'spotify',
                },
            },
        });

        if (!spotifyService) {
            res.status(404).send('Spotify service not found');
            return;
        }

        const accessToken = spotifyService.accessToken;

        const playlistsResponse = await fetch(`https://api.spotify.com/v1/users/${spotifyService.serviceId}/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const playlistsData = await playlistsResponse.json();

        res.status(200).send(playlistsData);
    } catch (error) {
        res.status(500).send('Error fetching the user\'s playlists');
    }
}