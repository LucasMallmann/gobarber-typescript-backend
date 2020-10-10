import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointments from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointments;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointments(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments from provider on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id_1',
      date: new Date(2020, 10, 20, 15, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id_2',
      date: new Date(2020, 10, 20, 16, 0, 0),
    });

    const appointmentsFromProvider = await listProviderAppointments.execute({
      day: 20,
      month: 11,
      year: 2020,
      provider_id: 'provider_id',
    });

    expect(appointmentsFromProvider).toEqual([appointment1, appointment2]);
  });
});
