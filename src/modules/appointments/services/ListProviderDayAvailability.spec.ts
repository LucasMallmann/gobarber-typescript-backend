import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2020, 9, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id',
      date: new Date(2020, 9, 20, 16, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 9, 20, 11);
      return customDate.getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      day: 20,
      month: 10,
      year: 2020,
      provider_id: 'user_id',
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 14,
          available: false,
        },
        {
          hour: 15,
          available: true,
        },
        {
          hour: 16,
          available: false,
        },
      ]),
    );
  });
});
