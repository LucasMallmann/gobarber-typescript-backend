import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;

let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const updatedUser = await fakeUsersRepository.findById(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({ password: '123456', token: 'non-existing' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non_existing_user_id',
    );

    await expect(
      resetPassword.execute({ password: '123456', token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password after 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    // Mocks a functionallity from another class
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
