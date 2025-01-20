import { Router } from 'express';
import { addAction, getAllActions, getActionById, updateAction } from '../controllers/action.controller';

const actionsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Actions
 *   description: API for managing actions
 */

/**
 * @swagger
 * /actions:
 *   post:
 *     summary: Add a new action
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Action'
 *     responses:
 *       200:
 *         description: The created action.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 */
actionsRouter.post('/', async (req, res) => {
  const { name, description, service } = req.body;
  const action = await addAction(name, description, service);
  res.json(action);
});

/**
 * @swagger
 * /actions:
 *   get:
 *     summary: Get all actions
 *     tags: [Actions]
 *     responses:
 *       200:
 *         description: List of all actions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Action'
 */
actionsRouter.get('/', async (req, res) => {
  const actions = await getAllActions();
  res.json(actions);
});

/**
 * @swagger
 * /actions/{id}:
 *   get:
 *     summary: Get an action by ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The action ID
 *     responses:
 *       200:
 *         description: The action description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 */
actionsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const action = await getActionById(Number(id));
  res.json(action);
});

/**
 * @swagger
 * /actions/{id}:
 *   put:
 *     summary: Update an action by ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The action ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Action'
 *     responses:
 *       200:
 *         description: The updated action
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 */
actionsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, service } = req.body;
  const action = await updateAction(Number(id), name, description, service);
  res.json(action);
});

export default actionsRouter;
