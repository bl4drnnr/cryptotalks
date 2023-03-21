import { Body, Controller, Post } from '@nestjs/common';
import { GatewayService } from '@modules/gateway.service';
import { CreatePostDto } from '@dto/create-post.dto';

@Controller('gateway')
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Post('posts/create')
  createPost(@Body() { title }: CreatePostDto) {
    return this.gatewayService.createPost({ title });
  }
}
