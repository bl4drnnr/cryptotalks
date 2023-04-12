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
import { LeaveCommentEvent } from '@events/leave-comment.event';
import { LeaveCommentEventDto } from '@event-dto/leave-comment.event.dto';
import { AlreadyExistingPostException } from '@exceptions/already-existing-post.exception';
import { PostNotFoundException } from '@exceptions/post-not-found.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    @Inject('POSTS_SERVICE') private readonly postsClient: ClientKafka
  ) {}

  async createPost(payload: CreatePostDto) {
    const existingPost = await this.postRepository.findOne({
      where: { title: { [Op.iLike]: `%${payload.title}%` } }
    });

    if (existingPost) throw new AlreadyExistingPostException();

    console.log('payload', payload);
    this.postsClient.emit(
      'post_created',
      new CreatePostEvent({
        ...payload
      })
    );
    return new ResponseDto();
  }

  async getPostBySlug({ slug }: { slug: string }) {
    const post = await this.postRepository.findOne({
      where: { slug }
    });

    if (!post) throw new PostNotFoundException();

    return post;
  }

  async listPosts({
    page,
    pageSize,
    order,
    orderBy,
    searchQuery,
    username
  }: {
    page: number;
    pageSize: number;
    order: string;
    orderBy: string;
    searchQuery?: string;
    username?: string;
  }) {
    const offset = page * pageSize;
    const limit = pageSize;
    const where = {};

    if (username) {
      where['username'] = {
        [Op.iLike]: `%${username}%`
      };
    }

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
      order: [[orderBy, order]],
      limit,
      offset,
      attributes: [
        'id',
        'title',
        'preview',
        [sequelize.literal('search_tags'), 'searchTags'],
        [sequelize.literal('created_at'), 'createdAt']
      ]
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

  leaveComment(payload: LeaveCommentEventDto) {
    this.postsClient.emit(
      'leave_comment',
      new LeaveCommentEvent({ ...payload })
    );
    return new ResponseDto();
  }
}
