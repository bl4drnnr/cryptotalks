import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { PostsService } from '@modules/posts.service';
import { CreatePostDto } from '@dto/create-post.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Post as PostModel } from '@models/post.model';
import { JwtGuard } from '@guards/jwt.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiExtraModels(PostModel)
  @ApiOperation({ summary: 'Responsible for post creation' })
  @ApiResponse({
    status: 200,
    description: 'As a response function gets success message'
  })
  @UseGuards(JwtGuard)
  @Post('create')
  createPost(@Body() payload: CreatePostDto) {
    return this.postsService.createPost(payload);
  }

  @ApiOperation({ summary: 'Gets post by its id' })
  @ApiResponse({
    status: 200,
    description: 'As a response function returns post'
  })
  @Get('get/:id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById({ id });
  }

  @ApiOperation({ summary: 'Responsible for post deletion' })
  @ApiResponse({
    status: 200,
    description: 'As a response function gets success message'
  })
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost({ id });
  }

  @ApiOperation({ summary: 'Responsible for post update' })
  @ApiResponse({
    status: 200,
    description: 'As a response function gets success message'
  })
  @UseGuards(JwtGuard)
  @Patch('update/:id')
  updatePost(@Param('id') id: string, @Body() payload) {
    return this.postsService.updatePost({ id, payload });
  }
}
