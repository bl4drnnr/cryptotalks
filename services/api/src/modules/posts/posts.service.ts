import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from '@dto/create-post.dto';
import { CreatePostEvent } from '@events/create-post.event';
import { ResponseDto } from '@dto/response.dto';
import { DeletePostEvent } from '@events/delete-post.event';
import { UpdatePostEvent } from '@events/update-post.event';
import { DeletePostEventDto } from '@event-dto/delete-post-event.dto';
import { UpdatePostEventDto } from '@event-dto/update-post-event.dto';
import { Post } from '@models/post.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    @Inject('POSTS_SERVICE') private readonly postsClient: ClientKafka
  ) {}

  createPost(payload: CreatePostDto) {
    this.postsClient.emit('post_created', new CreatePostEvent({ ...payload }));
    return new ResponseDto();
  }

  getPostById({ id }: { id: string }) {
    return this.postRepository.findByPk(id);
  }

  listPosts() {}

  deletePost(payload: DeletePostEventDto) {
    this.postsClient.emit('delete_post', new DeletePostEvent({ ...payload }));
    return new ResponseDto();
  }

  updatePost(payload: UpdatePostEventDto) {
    this.postsClient.emit('update_post', new UpdatePostEvent({ ...payload }));
    return new ResponseDto();
  }
}
