import { IRepository } from '../../repository/IRepository';
import { IFindUserDTO } from './findUserDTO';

export class FindUserUseCase {
  constructor(private repository: IRepository) {}

  async execute(props: IFindUserDTO) {
    const user = await this.repository.findUserByLogin(props);

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }
}
