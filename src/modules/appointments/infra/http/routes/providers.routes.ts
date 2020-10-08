import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', ProvidersController.index);

providersRouter.get(
  '/:id/month-availability',
  ProviderMonthAvailabilityController.index,
);

providersRouter.get(
  '/:id/day-availability',
  ProviderDayAvailabilityController.index,
);

export default providersRouter;
