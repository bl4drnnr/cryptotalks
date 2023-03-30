import { UpdatePostEventDto } from '../event-dto/update-post.event.dto';

export class UpdatePostEvent {
  constructor(private readonly updatePostPayload: UpdatePostEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.updatePostPayload
    });
  }
}
