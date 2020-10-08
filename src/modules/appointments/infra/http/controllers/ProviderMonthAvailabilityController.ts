import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;

    const { id: provider_id } = request.params;

    const listProvidersMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProvidersMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}

export default new ProviderMonthAvailabilityController();
