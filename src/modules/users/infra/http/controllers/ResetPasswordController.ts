import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).send();
  }
}

export default new ForgotPasswordController();
