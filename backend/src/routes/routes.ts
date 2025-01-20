import { Router } from 'express';
import { swaggerDocs } from '../config/swagger';
import { authenticateJWT } from '../middleware/auth.middleware';
import authRouter from './auth.routes';
import actionsRouter from './actions.routes';
import reactionsRouter from './reactions.routes';
import areasRouter from './areas.routes';
import swaggerUi from 'swagger-ui-express';
import webhooksRouter from './wehooks.routes';
import usersRouter from './user.routes';
import notificationsRouter from './/notifications.routes';
import linkRouter from './services/link.routes';
import unlinkRouter from './services/unlink.routes';
import serviceRouter from './services/services.routes';
import utilsRouter from './utils.routes';
import { githubRouter } from './github.routes';

const mainRouter = Router();

mainRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
mainRouter.use('/auth', authRouter);
mainRouter.use('/webhooks', webhooksRouter);

mainRouter.use('/users', authenticateJWT, usersRouter);
mainRouter.use('/link', authenticateJWT, linkRouter);
mainRouter.use('/unlink', authenticateJWT, unlinkRouter);
mainRouter.use('/services', authenticateJWT, serviceRouter);
mainRouter.use('/actions', authenticateJWT, actionsRouter);
mainRouter.use('/reactions', authenticateJWT, reactionsRouter);
mainRouter.use('/areas', authenticateJWT, areasRouter);
mainRouter.use('/notifications', notificationsRouter);
mainRouter.use('/utils', utilsRouter);

mainRouter.use('/github', authenticateJWT, githubRouter);

export default mainRouter;
