import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });

    return response.status(200).json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const createUser = container.resolve(UpdateProfileService);

    const user = await createUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(201).json(user);
  }
}

export default new ProfileController();
