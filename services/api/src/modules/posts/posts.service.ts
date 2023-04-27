import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from '@dto/create-post.dto';
import { CreatePostEvent } from '@events/create-post.event';
import { ResponseDto } from '@dto/response.dto';
import { DeletePostEvent, DeletePostEventDto } from '@events/delete-post.event';
import { UpdatePostEvent, UpdatePostEventDto } from '@events/update-post.event';
import { Post } from '@models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import {
  LeaveCommentEvent,
  LeaveCommentEventDto
} from '@events/leave-comment.event';
import { AlreadyExistingPostException } from '@exceptions/already-existing-post.exception';
import { PostNotFoundException } from '@exceptions/post-not-found.exception';
import { PostInfo } from '@models/post-info.model';
import { User } from '@models/user.model';
import { UpdatePostInfoEvent } from '@events/update-post-info.event';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    @InjectModel(PostInfo) private readonly postInfoRepository: typeof PostInfo,
    @InjectModel(User) private readonly userRepository: typeof User,
    @Inject('POSTS_SERVICE') private readonly postsClient: ClientKafka
  ) {}

  async createPost(payload: CreatePostDto) {
    const existingPost = await this.postRepository.findOne({
      where: { title: { [Op.iLike]: `%${payload.title}%` } }
    });

    if (existingPost) throw new AlreadyExistingPostException();

    payload.searchTags.forEach((tag) => {
      if (tag.length === 0 || tag.length > 20)
        throw new BadRequestException('tag-length', 'Tag length error');
    });

    this.postsClient.emit(
      'post_created',
      new CreatePostEvent({
        ...payload
      })
    );
    return new ResponseDto();
  }

  async getPostBySlug({
    slug,
    userId
  }: {
    slug: string;
    userId: string | undefined;
  }) {
    const post = await this.postRepository.findOne({
      where: { slug }
    });

    if (!post) throw new PostNotFoundException();

    const postInfo = await this.postInfoRepository.findOne({
      where: { postId: post.id }
    });

    const postComments = [];
    postInfo.comments.forEach((commentItem) => {
      const commentRates = commentItem.commentRates.map((item) => {
        return {
          username: item.username,
          rate: item.rate,
          rated: item.userId === userId
        };
      });
      postComments.push({ ...commentItem, commentRates });
    });
    const postRates = postInfo.rates.map((rate) => {
      return {
        username: rate.username,
        rate: rate.rate,
        rated: rate.userId === userId
      };
    });

    return {
      id: post.id,
      userId: post.userId,
      username: post.username,
      title: post.title,
      slug: post.slug,
      content: post.content,
      preview: post.preview,
      searchTags: post.searchTags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      postInfo: {
        rates: postRates,
        comments: postComments
      }
    };
  }

  async listPosts({
    page,
    pageSize,
    order,
    orderBy,
    searchQuery,
    username,
    tags
  }: {
    page: number;
    pageSize: number;
    order: string;
    orderBy: string;
    searchQuery?: string;
    username?: string;
    tags?: string;
  }) {
    const offset = page * pageSize;
    const limit = pageSize;
    const where = {};

    if (username) {
      where['username'] = {
        [Op.iLike]: `%${username}%`
      };
    }

    if (tags) {
      where['tags'] = {
        [Op.overlap]: tags.split(',')
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
        'slug',
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

  async leaveComment({
    comment,
    userId,
    postId
  }: {
    comment: string;
    userId: string;
    postId: string;
  }) {
    const { username } = await this.userRepository.findByPk(userId);
    this.postsClient.emit(
      'leave_comment',
      new LeaveCommentEvent({
        comment,
        postId,
        userId,
        username
      })
    );
    return new ResponseDto();
  }

  async ratePost({
    rate,
    userId,
    postId
  }: {
    rate: '+' | '-';
    userId: string;
    postId: string;
  }) {
    if (!['+', '-'].includes(rate))
      throw new BadRequestException('wrong-rate', 'Wrong rate value');

    const post = await this.postRepository.findByPk(postId);

    if (!post) throw new PostNotFoundException();

    const { username } = await this.userRepository.findByPk(userId);

    this.postsClient.emit(
      'update_post_info',
      new UpdatePostInfoEvent({
        rate,
        userId,
        postId,
        username
      })
    );
    return new ResponseDto();
  }

  async rateComment({
    rate,
    userId,
    postId,
    commentId
  }: {
    rate: '+' | '-';
    userId: string;
    postId: string;
    commentId: string;
  }) {
    if (!['+', '-'].includes(rate))
      throw new BadRequestException('wrong-rate', 'Wrong rate value');

    const post = await this.postRepository.findByPk(postId);

    if (!post) throw new PostNotFoundException();

    const postInfo = await this.postInfoRepository.findOne({
      where: { postId }
    });

    let commentExists: boolean = false;

    postInfo.comments.forEach((comment) => {
      commentExists = comment.id === commentId;
    });

    if (!commentExists)
      throw new BadRequestException(
        'comment-doesnt-exist',
        'Comment does not exist'
      );

    const { username } = await this.userRepository.findByPk(userId);

    this.postsClient.emit(
      'update_post_info',
      new UpdatePostInfoEvent({
        rate,
        userId,
        postId,
        commentId,
        username
      })
    );
    return new ResponseDto();
  }
}
