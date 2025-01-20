import { Router, Request, Response } from 'express';
import { getAllUserServicesByUserId } from '../../controllers/service.controller';
import { User } from '@prisma/client';

const serviceRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API for managing services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserService:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the service
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *         serviceName:
 *           type: string
 *           description: The name of the service
 *         accessToken:
 *           type: string
 *           description: The access token for the service
 *         refreshToken:
 *           type: string
 *           description: The refresh token for the service
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the service was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the service was last updated
 */

/**
  * @swagger
  * /services/me:
  *   get:
  *     summary: Retrieve all services for a specific user
  *     description: Fetches all services associated with the given user ID.
  *     tags:
  *       - Services
  *     responses:
  *       200:
  *         description: A list of services
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/UserService'
  *       401:
  *         description: Unauthorized
  *       404:
  *         description: User not found
  *       500:
  *         description: Internal server error
  */
serviceRouter.get('/me', async (req: Request, res: Response) => {
  const user = req.user as User;
  const services = await getAllUserServicesByUserId(user.id);
  res.json(services);
});

export default serviceRouter;
