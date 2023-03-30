import { DeletePostEventDto } from '../event-dto/delete-post-event.dto';

export class DeletePostEvent {
  constructor(private readonly deletePostPayload: DeletePostEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.deletePostPayload
    });
  }
}
