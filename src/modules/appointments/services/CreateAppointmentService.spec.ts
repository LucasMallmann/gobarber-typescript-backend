import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 9, 10, 12).getTime();
      return customDate;
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 9, 10, 12),
      provider_id: '123123',
      user_id: 'user_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not able to create appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 10, 9, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: 'user_id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '321321',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 9, 10, 12).getTime();
      return customDate;
    });

    await expect(
      createAppointment.execute({
        // Create an appointment 1 hour in the past
        date: new Date(2020, 9, 10, 11),
        provider_id: '321321',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 9, 10, 12).getTime();
      return customDate;
    });

    await expect(
      createAppointment.execute({
        // Create an appointment 1 hour in the past
        date: new Date(2020, 9, 10, 13),
        provider_id: 'same_id',
        user_id: 'same_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
