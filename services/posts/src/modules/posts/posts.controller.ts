import { Controller } from '@nestjs/common';
import { PostsService } from '@modules/posts.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @EventPattern('post_created')
  handlePostCreated(data: any) {
    return this.postsService.postCreated(data);
  }

  @EventPattern('delete_post')
  handleDeletePost(data: any) {
    return this.postsService.deletePost(data);
  }

  @EventPattern('update_post')
  handleUpdatePost(data: any) {
    return this.postsService.updatePost(data);
  }
}
