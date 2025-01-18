import { Router } from 'express';
import { unlinkUserService } from '../../controllers/service.controller';

const unlinkRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Unlink
 *   description: Endpoints for unlinking third-party accounts
 */

/**
 * @swagger
 * /unlink/{name}:
 *   delete:
 *     summary: Unlink a third-party account
 *     tags: [Unlink]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the third-party account to unlink
 *     responses:
 *       200:
 *         description: Successfully unlinked the third-party account
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
unlinkRouter.delete('/:name', async (req, res) => {
  await unlinkUserService(req, res);
});

export default unlinkRouter;
