import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from '@modules/posts.service';
import { CreatePostDto } from '@dto/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Responsible for post creation' })
  @ApiResponse({
    status: 200,
    description: 'As a response function gets success message'
  })
  @Post('create')
  createPost(@Body() payload: CreatePostDto) {
    return this.postsService.createPost(payload);
  }
}
