import { Router, Request, Response } from 'express';
import { User } from '@prisma/client';
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getCurrentUser,
} from '../controllers/user.controller';

const usersRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Users info routes
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
usersRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve the current user
 *     responses:
 *       200:
 *         description: The current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
usersRouter.get('/me', async (req: Request, res: Response) => {
  const userReq = req.user as User;
  const user = await getCurrentUser(userReq.id);
  res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
usersRouter.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
usersRouter.put('/:id', updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted
 */
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
