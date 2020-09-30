import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ProfileController.show);
profileRouter.put('/', ProfileController.update);

export default profileRouter;
