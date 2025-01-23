import { Router, Request, Response, NextFunction } from 'express';
import eventEmitter from '../config/events';
import githubTrigger from '../triggers/github.trigger';
import googleTrigger from '../triggers/google.trigger';
import redditTrigger from '../triggers/reddit.trigger';
import trelloTrigger from '../triggers/trello.trigger';

const webhooksRouter = Router();

webhooksRouter.post('/github', async (req: Request, res: Response, next: NextFunction) => {
  githubTrigger(req, res, eventEmitter);
});

webhooksRouter.post('/google', async (req: Request, res: Response, next: NextFunction) => {
  googleTrigger(req, res, eventEmitter);
});

webhooksRouter.post('/reddit', async (req: Request, res: Response, next: NextFunction) => {
  redditTrigger(req, res, eventEmitter);
});

webhooksRouter.post('/trello', async (req: Request, res: Response, next: NextFunction) => {
  // trelloTrigger(req, res, eventEmitter);
  res.status(200).send('Trello webhook received');
});

export default webhooksRouter;
