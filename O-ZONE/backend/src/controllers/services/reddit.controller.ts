import { Request, Response } from "express";
import { config } from "dotenv";
import { prisma } from '../../config/prisma';
import { REDDIT_SERVICE_CONFIG } from "../../config/services/reddit.config";
import { User } from "@prisma/client";

config();

export function redirectToReddit(_: Request, res: Response): void {
  const clientId = REDDIT_SERVICE_CONFIG.clientId;
  const responseType = 'code';
  const state = 'randomestringhere';
  const redirectUri = REDDIT_SERVICE_CONFIG.callbackURL;
  const durration = 'permanent';
  const scope = REDDIT_SERVICE_CONFIG.scope.join(',');

  const authorizationUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=${responseType}&state=${state}&redirect_uri=${redirectUri}&duration=${durration}&scope=${scope}`;

  res.redirect(authorizationUrl);
};

export async function redditCallback(req: Request, res: Response): Promise<void> {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('No code provided.');
    return;
  }

  try {
    const tokenUrl = 'https://www.reddit.com/api/v1/access_token';
    const body = new URLSearchParams({
      client_id: REDDIT_SERVICE_CONFIG.clientId,
      client_secret: REDDIT_SERVICE_CONFIG.clientSecret,
      redirect_uri: REDDIT_SERVICE_CONFIG.callbackURL,
      code: code as string,
      grant_type: 'authorization_code',
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      body,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${REDDIT_SERVICE_CONFIG.clientId}:${REDDIT_SERVICE_CONFIG.clientSecret}`).toString('base64')}`,
        'User-Agent': 'your-app-name',
      },
    });

    const data = await response.json();

    if (data.error) {
      res.status(500).send('Error fetching the access token.');
      return;
    }

    const accessToken = data.access_token;

    const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${accessToken}`,
        'User-Agent': 'your-app-name',
      },
    });

    const redditUserData = await userResponse.json();

    if (!redditUserData) {
      res.status(500).send('Error fetching user data.');
      return;
    }

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

    // Check if the user already has a Reddit service linked
    let redditService = await prisma.userService.findUnique({
      where: {
        userId_serviceId_serviceName: {
          userId: user.id,
          serviceId: redditUserData.id.toString(),
          serviceName: 'reddit',
        },
      },
    });

    if (!redditService) {
      // If the user does not have a Reddit service linked, create one
      await prisma.userService.create({
        data: {
          userId: user.id,
          serviceId: redditUserData.id.toString(),
          serviceName: 'reddit',
          accessToken: accessToken,
          refreshToken: '',
        },
      });
      return;
    }

    // If the user has a Reddit service linked, update tokens
    await prisma.userService.update({
      where: {
        id: redditService.id,
      },
      data: {
        accessToken: accessToken,
        refreshToken: '',
      },
    });

    // Step 3: Redirect the user to their redditUserData page
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  } catch (error) {
    res.status(500).send('Error during Reddit OAuth callback');
  }
};

export async function setRedditWebhook(req: Request, res: Response): Promise<void> {
  const { userId, subredditName, webhookURL } = req.body;

  const events = [
    'new_comment',
    'new_submission'
  ];

  if (!userId || !subredditName || !events || !webhookURL) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        services: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "No user found" });
      return;
    }

    const accessToken = user.services.find((s) => s.serviceName === "reddit")?.accessToken;

    const payload = {
      access_token: accessToken,
      subreddit: subredditName,
      events,       // Array of events to subscribe to (e.g., ['new_comment', 'new_submission'])
      webhook_url: webhookURL, // The URL where Reddit should send notifications
    };

    const response = await fetch('https://www.reddit.com/api/v1/push_notification', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({
        message: 'Successfully subscribed to Reddit webhook notifications',
        data,
      });
      return;
    }

    res.status(400).json({ error: data.error || 'Failed to subscribe to Reddit notifications' });
    return;
  } catch (error) {
    console.error('Error subscribing to Reddit notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export async function getSubscribedSubreddits(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const userId = parseInt(id);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        services: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "No user found" });
      return;
    }

    const accessToken = user.services.find((s) => s.serviceName === "reddit")?.accessToken;

    if (!accessToken) {
      res.status(400).json({ error: "User does not have a Reddit access token" });
      return;
    }

    const response = await fetch('https://www.reddit.com/subreddits/mine/subscriber', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'o-zone:v1.0.0 (by /u/Vegetal1509)',
      },
    });

    if (!response.ok) {
      const data = await response.json();

      console.log(data);

      res.status(400).json({ error: data.error || 'Failed to fetch user subreddits' });
      return;
    }

    const data = await response.json();
    res.status(200).json({
      message: 'Successfully fetched user subreddits',
      data,
    });

  } catch (error) {
    console.error('Error fetching user subreddits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
