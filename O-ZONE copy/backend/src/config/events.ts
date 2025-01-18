import { EventEmitter } from 'events';
import { ReactionPayload } from '../types/reaction';
import { sendDiscordMessageByWebhookURL } from '../reactions/discord/newMessage.reaction';

const eventEmitter = new EventEmitter();

eventEmitter.on('reaction:discord:new_message', async (payload: ReactionPayload) => {
  const { webhookURL } = payload;

  if (!webhookURL) {
    return;
  }

  await sendDiscordMessageByWebhookURL(webhookURL, 'Hello, World!');
});

export default eventEmitter;
