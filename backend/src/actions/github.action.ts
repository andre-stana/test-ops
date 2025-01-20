import { prisma } from '../config/prisma';
import eventEmitter from '../config/events';
import { ActionPayload } from '../types/actions';
import { config } from 'dotenv';
import { ReactionPayload } from '../types/reaction';

config();

// export async function handleGithubPushEvent(payload: any) {
//   console.log('Sending Discord message for GitHub Push Event');
//   const repoName = payload.repository.name;
//   const pusher = payload.pusher.name;
//   const commitMessage = payload.head_commit.message;
//   const commitUrl = payload.head_commit.url;

//   const message = `New push to ${repoName} by ${pusher}:\n${commitMessage}\n${commitUrl}`;

//   const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || '';

//   if (!discordWebhookUrl) {
//     console.error('DISCORD_WEBHOOK_URL is not set in the environment variables.');
//     return;
//   }

//   await sendDiscordMessageByWebhookURL(discordWebhookUrl, message);
// }

export async function handleGithubNewPushEvent(payload: ActionPayload) {
  const area = await prisma.area.findUnique({
    where: {
      id: payload.areaId,
    },
  });

  if (!area) {
    console.error(`Area with ID ${payload.areaId} not found`);
    return;
  }

  const reaction = await prisma.reaction.findUnique({
    where: {
      id: area.reactionId,
    },
  });

  if (!reaction) {
    console.error(`Reaction with ID ${area.reactionId} not found`);
    return;
  }

  const reaction_payload: ReactionPayload = {
    userId: payload.userId,
    reactionId: reaction.id,
    webhookURL: (reaction.webhookURL) ? reaction.webhookURL : '',
  };

  eventEmitter.emit(`reaction:${reaction.name}`, reaction_payload);
}
