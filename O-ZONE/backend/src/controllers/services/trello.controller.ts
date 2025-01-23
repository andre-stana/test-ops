import { Request, Response } from "express";
import { config } from "dotenv";
import { prisma } from '../../config/prisma';
import { TRELLO_SERVICE_CONFIG } from "../../config/services/trello.config";
import { User } from "@prisma/client";

config();

interface WebhookRequest {
    userId: number;
    idModel: string;
    webhookUrl: string;
}

export function redirectToTrello(_: Request, res: Response): void {
    const redirectUri = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=BF1KAl22tOnUCNRwdtsGVBaIQ1cYhQGO&scope=${TRELLO_SERVICE_CONFIG.scope.join(",")}%3Ame&redirect_uri=${encodeURIComponent("https://8t89n2qj-8080.uks1.devtunnels.ms/api/link/trello/callback")}&state=${"khgc1654kbh"}&response_type=code&prompt=consent`;
    console.log(redirectUri);
    res.redirect(redirectUri);
}

export async function trelloCallback(req: Request, res: Response): Promise<void> {
    const { code } = req.query;

    if (!code) {
        res.status(400).send('No code provided.');
        return;
    }

    try {
        const tokenUrl = 'https://auth.atlassian.com/oauth/token';
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: TRELLO_SERVICE_CONFIG.clientId,
            client_secret: TRELLO_SERVICE_CONFIG.clientSecret,
            code: code as string,
            redirect_uri: TRELLO_SERVICE_CONFIG.callbackURL,
        });

        const response = await fetch(tokenUrl, {
            method: 'POST',
            body,
            headers: { 'Accept': 'application/json' },
        });

        const data = await response.json();

        if (data.error) {
            res.status(500).send('Error fetching the access token.');
            return;
        }

        const accessToken = data.access_token;

        const userResponse = await fetch('https://api.atlassian.com/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const trelloUserData = await userResponse.json();

        const user = req.user as User;

        if (!user) {
          res.status(401).send('Unauthorized');
          return;
        }

        // Check if user exists
        const isUser: User | null = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            services: true,
          },
        });

        if (!isUser) {
          res.status(404).send('User not found');
          return;
        }

        let trelloService = await prisma.userService.findUnique({
            where: {
                userId_serviceId_serviceName: {
                    userId: user.id,
                    serviceId: trelloUserData.id.toString(),
                    serviceName: 'trello',
                },
            },
        });

        if (!trelloService) {
            // If the user does not have a Trello service linked, create one
            await prisma.userService.create({
              data: {
                userId: user.id,
                serviceId: trelloUserData.id.toString(),
                serviceName: 'trello',
                accessToken: accessToken,
                refreshToken: '',
              },
            });
            return;
        }

        await prisma.userService.update({
            where: {
              id: trelloService.id,
            },
            data: {
              accessToken: accessToken,
              refreshToken: '',
            },
        });

        (req.platform === 'mobile') ?
        res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
        res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
    } catch (error) {
        res.status(500).send('Error fetching the access token.');
    }
}

export async function setTrelloWebhook(req: Request, res: Response) {
  const {userId, repositoryName, webhookUrl} = req.body;

  if (!userId || !repositoryName || !webhookUrl) {
    res.status(400).send('Missing parameters');
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const trelloService = await prisma.userService.findFirst({
      where: {
        userId: userId,
        serviceName: 'trello',
      },
    });

    if (!trelloService) {
      res.status(404).send('Trello service not found');
      return;
    }

    const webhookUrl = `https://8t89n2qj-8080.uks1.devtunnels.ms/api/trello/webhook`;

    
    const response = await fetch(`https://api.trello.com/1/webhooks/?callbackURL=${webhookUrl}&idModel=5abbe4b7ddc1b351ef961414&key=${TRELLO_SERVICE_CONFIG.clientId}&token=${trelloService.accessToken}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (data.error) {
      res.status(500).send('Error setting the webhook');
      return;
    }
    
  } catch (error) {
    res.status(500).send('Error setting the webhook');
  }
};

export async function getUserBoards(req: Request, res: Response) {
  const {userId} = req.body;

  if (!userId) {
    res.status(400).send('Missing parameters');
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const trelloService = await prisma.userService.findFirst({
      where: {
        userId: userId,
        serviceName: 'trello',
      },
    });

    if (!trelloService) {
      res.status(404).send('Trello service not found');
      return;
    }

    const response = await fetch(`https://api.trello.com/1/members/${trelloService.serviceId}?key=${TRELLO_SERVICE_CONFIG.clientId}&token=${trelloService.accessToken}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (data.error) {
      res.status(500).send('Error fetching the user data');
      return;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error fetching the user data');
  }
}