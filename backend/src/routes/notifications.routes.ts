import { Router, Request, Response } from 'express';
import { getNotifications, deleteNotification } from '../controllers/notifications.controller';

const notifRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Notifications
 *     description: Notification routes
 */

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Retrieve a list of notifications by userId
 *     description: Retrieve a list of notifications by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
notifRouter.get('/:userId', async (req: Request, res: Response) => {
    await getNotifications(req, res);
});

/**
 * @swagger
 * /notifications/delete/{id}:
 *   delete:
 *     tags:
 *       - Notifications
 *     summary: Delete a notification by id
 *     description: Delete a notification by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification deleted
 */
notifRouter.delete('/:id', async (req: Request, res: Response) => {
    await deleteNotification(req, res);
});

export default notifRouter;
