import { Router } from 'express';

import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.get('/', (req, res) => {
  return res.json('oi');
});

export default routes;
