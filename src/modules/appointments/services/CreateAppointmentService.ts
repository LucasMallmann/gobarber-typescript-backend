import { startOfHour, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

/**
 * Service depends upon an interface
 */
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError({
        message: "You can't create an appointment on a past date",
      });
    }

    const findAppointmentInSameData = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameData) {
      throw new AppError({
        message: 'This appointment is already booked',
      });
    }

    if (user_id === provider_id) {
      throw new AppError({
        message: "You can't create an appointment with yourself.",
      });
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
