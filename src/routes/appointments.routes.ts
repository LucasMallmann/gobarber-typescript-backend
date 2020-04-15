import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res) => {
  return res.json({ message: 'Hey' });
});

export default appointmentsRouter;
