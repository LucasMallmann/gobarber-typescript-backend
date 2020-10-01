import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviders from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProviders);

    const appointment = await listProviders.execute({ user_id });

    return response.json(appointment);
  }
}

export default new ProvidersController();
