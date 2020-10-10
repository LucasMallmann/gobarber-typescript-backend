import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ProfileController.show,
);
profileRouter.put('/', ProfileController.update);

export default profileRouter;
