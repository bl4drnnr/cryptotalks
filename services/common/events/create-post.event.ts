import { CreatePostDto } from '../dto/create-post.dto';

export class CreatePostEvent {
  constructor(private readonly createPostPayload: CreatePostDto) {}

  toString() {
    return JSON.stringify({
      ...this.createPostPayload
    });
  }
}
