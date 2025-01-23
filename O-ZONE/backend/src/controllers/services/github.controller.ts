import { Request, Response } from "express";
import { config } from "dotenv";
import { prisma } from '../../config/prisma';
import { GITHUB_SERVICE_CONFIG } from "../../config/services/github.config";
import { User } from "@prisma/client";

config();

const GITHUB_API_URL = "https://api.github.com";

interface WebhookRequest {
  userId: number;
  repositoryName: string;
  webhookUrl: string;
}

export function redirectToGitHub(_: Request, res: Response): void {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${GITHUB_SERVICE_CONFIG.clientId}&redirect_uri=${GITHUB_SERVICE_CONFIG.callbackURL}&scope=${GITHUB_SERVICE_CONFIG.scope.join(',')}`;
  console.log(redirectUri);
  res.redirect(redirectUri);
};

export async function githubCallback(req: Request, res: Response): Promise<void> {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('No code provided.');
    return;
  }

  try {
    const tokenUrl = 'https://github.com/login/oauth/access_token';
    const body = new URLSearchParams({
      client_id: GITHUB_SERVICE_CONFIG.clientId,
      client_secret: GITHUB_SERVICE_CONFIG.clientSecret,
      redirect_uri: GITHUB_SERVICE_CONFIG.callbackURL,
      code: code as string,
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

    const userResponse = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization': `token ${accessToken}`,
      },
    });

    const githubUserData = await userResponse.json();

    if (!githubUserData) {
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

    // Check if the user already has a Github service linked
    let githubService = await prisma.userService.findUnique({
      where: {
        userId_serviceId_serviceName: {
          userId: user.id,
          serviceId: githubUserData.id.toString(),
          serviceName: 'github',
        },
      },
    });

    if (!githubService) {
      // If the user does not have a Github service linked, create one
      await prisma.userService.create({
        data: {
          userId: user.id,
          serviceId: githubUserData.id.toString(),
          serviceName: 'github',
          accessToken: accessToken,
          refreshToken: '',
        },
      });
      return;
    }

    // If the user has a Github service linked, update tokens
    await prisma.userService.update({
      where: {
        id: githubService.id,
      },
      data: {
        accessToken: accessToken,
        refreshToken: '',
      },
    });

    // Step 3: Redirect the user to their githubUserData page
    (req.platform === 'mobile') ?
      res.redirect(`${process.env.MOBILE_APP_URL}connections`) :
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/connections`);
  } catch (error) {
    res.status(500).send('Error during GitHub OAuth callback');
  }
};

export async function setGithubWebhook(req: Request, res: Response) {
  const { userId, repositoryName, webhookUrl }: WebhookRequest = req.body;

  if (!userId || !repositoryName || !webhookUrl) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Retrieve the user's access token from the database
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

    const accessToken = user.services.find((s) => s.serviceName === "github")?.accessToken;

    if (!accessToken) {
      res.status(400).json({ error: "User does not have a GitHub access token" });
      return;
    }

    // Extract owner and repo from repositoryName
    const [owner, repo] = repositoryName.split("/");
    if (!owner || !repo) {
      res.status(400).json({ error: "Invalid repository name format" });
      return;
    }

    const webhookPayload = {
      name: "web",
      active: true,
      events: [
        "push",
        "pull_request",
        "issues",
        "issue_comment",
        "commit_comment",
        "release",
        "workflow_run",
      ],
      config: {
        url: webhookUrl,
        content_type: "json",
      },
    };

    // GitHub API call to create a webhook
    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/hooks`, {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      res.status(response.status).json({ error: errorData.message || "An error occurred" });
      return;
    }

    const data = await response.json();
    res.status(201).json({
      message: "Webhook created successfully", data
    });
    console.log("Webhook created successfully");
  } catch (error: any) {
    console.error("Error setting webhook:", error);
    res.status(500).json({
      error: error.message || "Internal Server Error"
    });
    console.log("Webhook creation failed");
  }
};

export async function getUserRepositories(req: Request, res: Response) {
  const { id }: { id?: string } = req.params;

  if (!id) {
    res.status(400).json({ error: "Missing required userId" });
    return;
  }

  try {
    const userId = parseInt(id);

    // Retrieve the user's access token from the database
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

    const accessToken = user.services.find((s) => s.serviceName === "github")?.accessToken;

    if (!accessToken) {
      res.status(400).json({ error: "User does not have a GitHub access token" });
      return;
    }

    // GitHub API call to fetch the user's repositories
    const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      res.status(response.status).json({ error: errorData.message || "An error occurred" });
      return;
    }

    const repositories = await response.json();

    // Extract repository names from the response
    const repositoryNames = repositories.map((repo: { name: string }) => repo.name);

    res.status(200).json({
      repositories: repositoryNames,
    });
  } catch (error: any) {
    console.error("Error fetching repositories:", error);
    res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
