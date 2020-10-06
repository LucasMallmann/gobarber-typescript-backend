import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  month: number;
  year: number;
  provider_id: string;
}

type IResponse = Array<{
  day: number;
  availability: boolean;
}>;

@injectable()
class ListProvidersMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        month,
        year,
        provider_id,
      },
    );

    console.log(appointments);

    return [
      {
        day: 1,
        availability: true,
      },
    ];
  }
}

export default ListProvidersMonthAvailabilityService;
