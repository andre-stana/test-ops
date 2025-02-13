import { Request, Response, Router } from 'express';
import { addArea, getAllAreas, getAreaById, updateArea } from '../controllers/area.controller';

const areasRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: API for managing areas
 */

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Add a new area
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: The created area.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 */
areasRouter.post('/', async (req: Request, res: Response) => {
  const { name, description, actionId, reactionId, userId } = req.body;

  if (!name || !description || !actionId || !reactionId || !userId) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const area = await addArea(name, description, userId, actionId, reactionId);

  if (!area) {
    res.status(500).json({ message: 'Failed to create area' });
    return;
  }

  res.json(area);
});

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Get all areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: List of all areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 */
areasRouter.get('/', async (req: Request, res: Response) => {
  const areas = await getAllAreas();
  res.json(areas);
});

/**
 * @swagger
 * /areas/{id}:
 *   get:
 *     summary: Get an area by ID
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The area ID
 *     responses:
 *       200:
 *         description: The area description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 */
areasRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const area = await getAreaById(Number(id));

  if (!area) {
    res.status(404).json({ message: 'Area not found' });
    return;
  }

  res.json(area);
});

/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Update an area by ID
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The area ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: The updated area
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 */
areasRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const { name, description, actionId, reactionId, userId } = req.body;

  if (!name || !description || !actionId || !reactionId || !userId) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const area = await updateArea(Number(id), name, description, actionId, reactionId, userId);
  res.json(area);
});

export default areasRouter;
