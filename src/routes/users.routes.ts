import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatar = new UpdateUserAvatarService();

    const updatedUser = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete updatedUser.password;

    return response.json(updatedUser);
  },
);

export default usersRouter;
