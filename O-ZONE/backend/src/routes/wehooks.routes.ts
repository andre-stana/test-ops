import { Router, Request, Response, NextFunction } from 'express';
import eventEmitter from '../config/events';
import githubTrigger from '../triggers/github.trigger';

const webhooksRouter = Router();

webhooksRouter.post('/github', async (req: Request, res: Response, next: NextFunction) => {
  githubTrigger(req, res, eventEmitter);
});

export default webhooksRouter;
