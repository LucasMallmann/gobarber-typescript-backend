import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  month: number;
  year: number;
  user_id: string;
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

  async execute({ user_id }: IRequest): Promise<IResponse> {
    // const appointments = this.appointmentRepository

    return [
      {
        day: 1,
        availability: true,
      },
    ];
  }
}

export default ListProvidersMonthAvailabilityService;
