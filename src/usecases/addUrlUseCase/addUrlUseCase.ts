import { nanoid } from 'nanoid';
import { IRepository } from '../../repository/IRepository';
import { IAddUrlDTO } from './addUrlDTO';

export class AddUrlUseCase {
  constructor(private repository: IRepository) {}

  async execute(props: IAddUrlDTO) {
    if (!props.uri) {
      props.uri = nanoid(4);
    }

    const user = await this.repository.addUrlInUser(props.id, {
      origin: props.url,
      uri: props.uri,
    });

    return user;
  }
}
