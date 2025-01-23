import { Router } from 'express';

const utilsRouter = Router();

utilsRouter.get('/user', (req, res) => {
  res.json({ status: 'ok' });
});

utilsRouter.get('/confidentiality', (req, res) => {
  res.json({ status: 'ok' });
});

export default utilsRouter;
