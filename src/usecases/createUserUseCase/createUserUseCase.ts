import { IRepository } from '../../repository/IRepository';
import { ICreateUserDTO } from './createUserDTO';

export class CreateUserUseCase {
  constructor(private repository: IRepository) {}

  async execute(props: ICreateUserDTO) {
    const user = await this.repository.createUser(props);

    return user;
  }
}
