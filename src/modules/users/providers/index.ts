import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

/**
 * The generics are going to ensure that the AppointmentsRepository in the Container implements the Interface methods
 */
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
