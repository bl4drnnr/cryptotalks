import { Controller } from '@nestjs/common';
import { PostsService } from '@modules/posts.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @EventPattern('post_created')
  handlePostCreated(data: any) {
    this.postsService.postCreated(data.value);
  }
}
