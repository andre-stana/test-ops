export type ReactionPayload = {
  userId: number;
  reactionId: number;
  event?: string;
  webhookURL?: string;
  emailTo?: string;
};
