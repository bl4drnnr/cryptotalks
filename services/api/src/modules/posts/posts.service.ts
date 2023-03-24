import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from '@dto/create-post.dto';
import { CreatePostEvent } from '@events/create-post.event';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_SERVICE') private readonly postsClient: ClientKafka
  ) {}

  createPost({ title }: CreatePostDto) {
    return this.postsClient.emit(
      'post_created',
      new CreatePostEvent({ title })
    );
  }
}
