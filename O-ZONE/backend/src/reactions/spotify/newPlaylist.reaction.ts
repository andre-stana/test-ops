import { SPOTIFY_SERVICE_CONFIG  } from "../../config/services/spotify.config";
import { prisma } from '../../config/prisma';


async function createPlaylist(accessToken: string, userId: number, playlistName: string): Promise<string> {

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            services: true,
        },
    });

    if (!user) {
        throw new Error('User not found');
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
        throw new Error('Spotify service not found');
    }

    const response = await fetch(`https://api.spotify.com/v1/users/${spotifyService.id}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: playlistName,
            description: 'Created by O-Zone',
            public: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create playlist: ${response.statusText}`);
    }

    const data = await response.json();
    return data.id;
}

export { createPlaylist };