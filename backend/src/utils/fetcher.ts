import { User } from "@prisma/client";
import { prisma } from "../config/prisma";

export async function fetchGithubUserEmailByToken(accessToken: string): Promise<string | null> {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'MyApp',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user email');
  }

  const emails = await response.json();
  const primaryEmail = emails.find((email: any) => email.primary && email.verified);
  return primaryEmail ? primaryEmail.email : null;
}

export async function getUserByGithubId(id: number): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      services: {
        some: {
          serviceName: 'github',
          serviceId: id.toString(),
        },
      },
    },
  });

  return user;
}
