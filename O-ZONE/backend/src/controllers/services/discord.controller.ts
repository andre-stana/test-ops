import { Request, Response } from "express";
import { config } from "dotenv";
import { prisma } from '../../config/prisma';
import { DISCORD_CONFIG, DISCORD_SERVICE_CONFIG } from "../../config/services/discord.config";
import { User, UserService } from "@prisma/client";
import { UserWithServices } from "../../types/types";

config();

export function redirectToDiscord(_: Request, res: Response): void {
  const callbackURI = encodeURIComponent(DISCORD_CONFIG.callbackURL);
  const redirectUri = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CONFIG.clientId}&response_type=code&redirect_uri=${callbackURI}&scope=${DISCORD_CONFIG.scope.join('+')}`;
  res.redirect(redirectUri);
};

export function redirectToDiscordService(_: Request, res: Response): void {
  const callbackURI = encodeURIComponent(DISCORD_SERVICE_CONFIG.callbackURL);
  console.log(callbackURI);
  const redirectUri = `https://discord.com/oauth2/authorize?client_id=${DISCORD_SERVICE_CONFIG.clientId}&response_type=code&redirect_uri=${callbackURI}&scope=${DISCORD_SERVICE_CONFIG.scope.join('+')}`;
  res.redirect(redirectUri);
};

export async function discordCallback(req: Request, res: Response): Promise<void> {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).send('No code provided.');
    return;
  }

  try {
    const tokenUrl = 'https://discord.com/api/oauth2/token';
    const body = new URLSearchParams({
      client_id: DISCORD_CONFIG.clientId,
      client_secret: DISCORD_CONFIG.clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: DISCORD_CONFIG.callbackURL,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      body,
    });

    const data = await response.json();

    if (data.error) {
      res.status(500).send('Error fetching the access token.');
      return;
    }

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const discordUserData = await userResponse.json();

    if (!discordUserData) {
      res.status(500).send('Error fetching user data.');
      return;
    }

    console.log(discordUserData);

    const profile = discordUserData;

    let user: User | null = await prisma.user.findUnique({
      where: { email: profile.email },
      include: {
        services: true
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.username,
          services: {
            create: {
              serviceId: profile.id.toString(),
              serviceName: 'discord',
              accessToken,
              refreshToken: refreshToken || '',
            },
          },
        },
      });
    } else {
      // Check if the user already has a Discord service linked
      const discordService = (user as UserWithServices).services.find(
        (service: UserService) => service.serviceName === 'discord'
      );

      if (!discordService) {
        // If the user does not have a Discord service linked, create one
        await prisma.userService.create({
          data: {
            userId: user.id,
            serviceId: profile.id.toString(),
            serviceName: 'discord',
            accessToken: accessToken,
            refreshToken: refreshToken || '',
          },
        });
      } else {
        // If the user has a Discord service linked, update tokens
        await prisma.userService.update({
          where: {
            id: discordService.id
          },
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken || '',
          },
        });
      }
    }

    // Step 3: Redirect the user to their connections page
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  } catch (error) {
    res.status(500).send('Error during Discord OAuth callback');
  }
};

export async function discordServiceCallback(req: Request, res: Response): Promise<void> {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).send('No code provided.');
    return;
  }

  try {
    const tokenUrl = 'https://discord.com/api/oauth2/token';
    const body = new URLSearchParams({
      client_id: DISCORD_SERVICE_CONFIG.clientId,
      client_secret: DISCORD_SERVICE_CONFIG.clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: DISCORD_SERVICE_CONFIG.callbackURL,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      body,
    });

    const data = await response.json();

    if (data.error) {
      res.status(500).send('Error fetching the access token.');
      return;
    }

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const discordUserData = await userResponse.json();

    if (!discordUserData) {
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

    // Check if the user already has a Discord service linked
    let discordService = await prisma.userService.findUnique({
      where: {
        userId_serviceId_serviceName: {
          userId: user.id,
          serviceId: discordUserData.id,
          serviceName: 'discord',
        },
      },
    });

    if (!discordService) {
      // If the user does not have a Discord service linked, create one
      await prisma.userService.create({
        data: {
          userId: user.id,
          serviceId: discordUserData.id,
          serviceName: 'discord',
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      return;
    }

    // If the user has a Discord service linked, update tokens
    await prisma.userService.update({
      where: {
        id: discordService.id,
      },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    console.log("Discord service linked successfully");

    // Step 3: Redirect the user to their connections page
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  } catch (error) {
    res.status(500).send('Error during Discord OAuth callback');
  }
};
