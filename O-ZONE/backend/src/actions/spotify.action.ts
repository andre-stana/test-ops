import { config } from 'dotenv';
import { prisma } from '../config/prisma';
import { Area, Action, User, UserService } from '@prisma/client';
import { ReactionPayload } from '../types/reaction';
import eventEmitter from '../config/events';
import cron from 'node-cron';

config();

export async function LaunchSpotifyLoop() {
    cron.schedule('*/5 * * * *', async () => {
        await SpotifyComparePlaylist();
    });
}

export async function SpotifyComparePlaylist() {
    const actions = await prisma.action.findMany({
        where: {
            service: "spotify"
        }
    });

    for (const action of actions) {
        const tmp: Area[] | null = await prisma.area.findMany({
            where: {
                actionId: action.id,
            },
        });

        if (!tmp) {
            continue;
        }

        for (const curr_area of tmp as any) {
            const user: User | null = await prisma.user.findUnique({
                where: {
                    id: curr_area.userId ?? undefined,
                },
            });

            if (!user) {
                continue;
            }

            const userService: UserService | null = await prisma.userService.findFirst({
                where: {
                    userId: user.id,
                    serviceName: "spotify",
                },
            });

            if (!userService) {
                continue;
            }

            const playlistId = (curr_area.actionParams).playlistId;

            const SpotifyPlaylistChange = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${userService.accessToken}`,
                },
            });

            const SpotifyPlaylistChangeData = await SpotifyPlaylistChange.json();

            if (!SpotifyPlaylistChangeData) {
                continue;
            }

            const payload: ReactionPayload = {
                userId: user.id,
                reactionId: curr_area.reactionId,
            };

            if (!(curr_area.actionParams as any).lastSong) {
                curr_area.actionParams = {
                    lastSong: SpotifyPlaylistChangeData.tracks.items[0],
                };
                continue;
            }

            if (SpotifyPlaylistChangeData.tracks.items[0] !== (curr_area.actionParams as any).lastSong) {
                curr_area.actionParams = {
                    lastSong: SpotifyPlaylistChangeData.tracks.items[0],
                };
                eventEmitter.emit('reaction:spotify:playlist_change', payload);
            }
        }
    }
}
