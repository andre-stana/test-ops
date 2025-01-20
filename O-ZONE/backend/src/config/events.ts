import { EventEmitter } from 'events';
import { ReactionPayload } from '../types/reaction';
import { prisma } from './prisma';
import {
  sendDiscordMessageByWebhookURL,
  sendDiscordMessageByDM,
  getDiscordUserDM
} from '../reactions/discord/newMessage.reaction';
import { sendEmailNotification } from '../reactions/email/sendEmail.reaction';

const eventEmitter = new EventEmitter();

eventEmitter.on('reaction:discord:new_message', async (payload: ReactionPayload) => {
  const { webhookURL } = payload;

  if (!webhookURL) {
    return;
  }

  await sendDiscordMessageByWebhookURL(webhookURL, 'Hello, World!');
});

eventEmitter.on('reaction:discord:new_dm', async (payload: ReactionPayload) => {
  const reaction = await prisma.reaction.findUnique({
    where: {
      id: payload.reactionId,
    },
  });

  if (!reaction) {
    console.error(`Reaction with ID ${payload.reactionId} not found`);
    return;
  }

  const service = await prisma.userService.findFirst({
    where: {
      userId: payload.userId,
      serviceName: 'discord',
    },
  });

  if (!service) {
    console.error(`Discord service not found for user with ID ${payload.userId}`);
    return;
  }

  const accessToken = service.accessToken;

  if (!accessToken) {
    console.error(`Access token not found for user with ID ${payload.userId}`);
    return;
  }

  const dmChannels = await getDiscordUserDM(accessToken);

  console.log(dmChannels[0].id, dmChannels[0].name);

  // await sendDiscordMessageByDM(accessToken, dmChannels[0].id, 'Hello, World!');
});


eventEmitter.on('reaction:mail:send_email', async (payload: ReactionPayload) => {
  const { emailTo } = payload;

  if (!emailTo) {
    return;
  }

  await sendEmailNotification(emailTo, 'Actions triggered', 'An action has been triggered !');
});

export default eventEmitter;
