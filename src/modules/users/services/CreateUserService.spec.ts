import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'john@email.com',
      name: 'John Doe',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with an already existing email account', async () => {
    await createUser.execute({
      email: 'john@email.com',
      name: 'John Doe',
      password: '123123',
    });

    await expect(
      createUser.execute({
        email: 'john@email.com',
        name: 'John Doe',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
