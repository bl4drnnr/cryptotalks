import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from '@dto/create-post.dto';
import { CreatePostEvent } from '@events/create-post.event';
import { ResponseDto } from '@dto/response.dto';
import { DeletePostEvent } from '@events/delete-post.event';
import { UpdatePostEvent } from '@events/update-post.event';
import { DeletePostEventDto } from '@event-dto/delete-post.event.dto';
import { UpdatePostEventDto } from '@event-dto/update-post.event.dto';
import { Post } from '@models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';

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

  async listPosts({
    page,
    pageSize,
    order,
    orderBy,
    searchQuery
  }: {
    page: number;
    pageSize: number;
    order: string;
    orderBy: string;
    searchQuery?: string;
  }) {
    const offset = page * pageSize;
    const limit = pageSize;
    const where = {};

    if (searchQuery) {
      where[Op.or] = [
        {
          title: {
            [Op.iLike]: `%${searchQuery}%`
          }
        },
        sequelize.where(
          sequelize.fn('array_to_string', sequelize.col('search_tags'), ','),
          'ILIKE',
          `%${searchQuery}%`
        )
      ];
    }

    return await this.postRepository.findAndCountAll({
      where: { ...where },
      order: [[order, orderBy]],
      limit,
      offset
    });
  }

  deletePost(payload: DeletePostEventDto) {
    this.postsClient.emit('delete_post', new DeletePostEvent({ ...payload }));
    return new ResponseDto();
  }

  updatePost(payload: UpdatePostEventDto) {
    this.postsClient.emit('update_post', new UpdatePostEvent({ ...payload }));
    return new ResponseDto();
  }
}
