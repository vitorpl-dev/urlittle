import { IRepository } from '../../repository/IRepository';

export class DeleteUserUseCase {
  constructor(private repository: IRepository) {}

  async execute(id: string) {
    await this.repository.deleteUser(id);
  }
}
