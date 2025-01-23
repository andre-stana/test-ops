import { Request, Response } from 'express';
import { config } from 'dotenv';
import { prisma } from '../../config/prisma';
import { GOOGLE_SERVICE_CONFIG } from '../../config/services/google.config';

config();

export function redirectToGoogle(_: Request, res: Response): void {
    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_SERVICE_CONFIG.clientId}&redirect_uri=${GOOGLE_SERVICE_CONFIG.callbackURL}&response_type=code&scope=${GOOGLE_SERVICE_CONFIG.scope.join(' ')}`;
    console.log(redirectUri);
    res.redirect(redirectUri);
}

export async function setGoogleWebhook_MAIL(req: Request, res: Response) {
    const { userId, webhookUrl, topicName } = req.body;

    if (!userId || !webhookUrl || !topicName) {
        res.status(400).send('Missing userId, webhookUrl, or topicName');
        return;
    }

    try {
        // Récupérer l'utilisateur
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const googleService = await prisma.userService.findFirst({
            where: {
                userId: user.id,
                serviceName: 'google',
            },
        });

        if (!googleService) {
            res.status(404).send('Google service not found');
            return;
        }

        const accessToken = googleService.accessToken;
        const serviceId = googleService.serviceId;
        const apiUrl = `https://gmail.googleapis.com/gmail/v1/users/${serviceId}/watch`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topicName: `projects/${GOOGLE_SERVICE_CONFIG.clientId}/topics/gmail-notification`,
                labelIds: ['INBOX'],
            }),
        });

    } catch (error: any) {
        console.error('Error setting Google Webhook:', error.response?.data || error.message);
        res.status(500).send('Error setting Google Webhook');
    }

}
