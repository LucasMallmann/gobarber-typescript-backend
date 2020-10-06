import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProvidersMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProvidersMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 20, 18, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 21, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 11, 22, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user_id',
      year: 2020,
      month: 12,
    });

    // Expect to be an array
    // 20 and 21 com available = false
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
