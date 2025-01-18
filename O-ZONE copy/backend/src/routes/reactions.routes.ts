import { Router } from 'express';
import { addReaction, getAllReactions, getReactionById, updateReaction } from '../controllers/reaction.controller';

const reactionsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Reactions
 *   description: API for managing reactions
 */

/**
 * @swagger
 * /reactions:
 *   post:
 *     summary: Add a new reaction
 *     tags: [Reactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reaction'
 *     responses:
 *       200:
 *         description: The created reaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reaction'
 */
reactionsRouter.post('/', async (req, res) => {
  const { name, description, service } = req.body;
  const reaction = await addReaction(name, description, service);
  res.json(reaction);
});

/**
 * @swagger
 * /reactions:
 *   get:
 *     summary: Get all reactions
 *     tags: [Reactions]
 *     responses:
 *       200:
 *         description: List of all reactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reaction'
 */
reactionsRouter.get('/', async (req, res) => {
  const reactions = await getAllReactions();
  res.json(reactions);
});

/**
 * @swagger
 * /reactions/{id}:
 *   get:
 *     summary: Get a reaction by ID
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The reaction ID
 *     responses:
 *       200:
 *         description: The reaction description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reaction'
 */
reactionsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const reaction = await getReactionById(Number(id));
  res.json(reaction);
});

/**
 * @swagger
 * /reactions/{id}:
 *   put:
 *     summary: Update a reaction by ID
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The reaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reaction'
 *     responses:
 *       200:
 *         description: The updated reaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reaction'
 */
reactionsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, service } = req.body;
  const reaction = await updateReaction(Number(id), name, description, service);
  res.json(reaction);
});

export default reactionsRouter;
