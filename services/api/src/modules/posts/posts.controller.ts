import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from '@modules/posts.service';
import { CreatePostDto } from '@dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('create')
  createPost(@Body() { title }: CreatePostDto) {
    return this.postsService.createPost({ title });
  }
}
