import * as node2fa from 'node-2fa';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from '@dto/create-post.dto';
import { CreatePostEvent } from '@events/create-post.event';
import { ResponseDto } from '@dto/response.dto';
import { DeletePostEvent, DeletePostEventDto } from '@events/delete-post.event';
import { UpdatePostEvent } from '@events/update-post.event';
import { Post } from '@models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { LeaveCommentEvent } from '@events/leave-comment.event';
import { AlreadyExistingPostException } from '@exceptions/already-existing-post.exception';
import { PostNotFoundException } from '@exceptions/post-not-found.exception';
import { PostInfo } from '@models/post-info.model';
import { User } from '@models/user.model';
import { UpdatePostInfoEvent } from '@events/update-post-info.event';
import { UpdatePostDto } from '@dto/update-post.dto';
import { UserSettings } from '@models/user-settings.model';
import { Wrong2faException } from '@exceptions/wrong-2fa.exception';
import { UpdateUserSecurityEvent } from '@events/update-user-security.event';
import * as dayjs from 'dayjs';
import { PhoneCodeErrorException } from '@exceptions/phone-code-error.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    @InjectModel(PostInfo) private readonly postInfoRepository: typeof PostInfo,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserSettings)
    private readonly userSettingsRepository: typeof UserSettings,
    @Inject('POSTS_SERVICE') private readonly postsClient: ClientKafka,
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka
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
    userId,
    toEdit
  }: {
    slug: string;
    userId: string | undefined;
    toEdit?: string | undefined;
  }) {
    const post = await this.postRepository.findOne({
      where: { slug }
    });

    if (!post) throw new PostNotFoundException();

    if (toEdit === 'yes' && userId !== post.userId)
      throw new BadRequestException('wrong-user', 'Wrong user');

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
    userId,
    page,
    pageSize,
    order,
    orderBy,
    searchQuery,
    username,
    tags
  }: {
    userId?: string;
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

    if (userId) {
      where['userId'] = userId;
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

    const { rows, count } = await this.postRepository.findAndCountAll({
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

    const postsInfo = await this.postInfoRepository.findAll({
      where: {
        postId: {
          [Op.in]: rows.map((post) => post.id)
        }
      },
      attributes: ['postId', 'rates']
    });

    const posts = [];

    rows.forEach((row) => {
      postsInfo.forEach((postInfo) => {
        if (row.id === postInfo.postId)
          posts.push({
            id: row.id,
            title: row.title,
            preview: row.preview,
            slug: row.slug,
            searchTags: row.searchTags,
            createdAt: row.createdAt,
            rates: postInfo.rates
          });
      });
    });

    return { rows: posts, count };
  }

  async deletePost({
    userId,
    payload
  }: {
    userId: string;
    payload: DeletePostEventDto;
  }) {
    const post = await this.postRepository.findByPk(payload.id);

    if (!post) throw new PostNotFoundException();

    if (userId !== post.userId)
      throw new BadRequestException('wrong-user', 'Wrong user');

    const userSecuritySettings = await this.userSettingsRepository.findOne({
      where: { userId }
    });

    if (userSecuritySettings.twoFaToken && !payload.twoFaCode) {
      return new ResponseDto('two-fa-required');
    } else if (userSecuritySettings.twoFaToken && payload.twoFaCode) {
      const codeVerification = node2fa.verifyToken(
        userSecuritySettings.twoFaToken,
        payload.twoFaCode
      );

      if (!codeVerification || codeVerification.delta !== 0)
        throw new Wrong2faException();
    } else if (userSecuritySettings.phone && !payload.code) {
      this.userClient.emit(
        'send_verification_mobile_code',
        new UpdateUserSecurityEvent({
          userId,
          phone: userSecuritySettings.phone
        })
      );

      return new ResponseDto('phone-two-fa-required');
    } else if (userSecuritySettings.phone && payload.code) {
      const { phoneVerificationCode, verificationCodeCreatedAt } =
        await this.userSettingsRepository.findOne({
          where: { userId }
        });

      const time = dayjs(verificationCodeCreatedAt);
      const timeDifferenceInMinutes = dayjs().diff(time, 'minute');

      if (payload.code !== phoneVerificationCode || timeDifferenceInMinutes > 5)
        throw new PhoneCodeErrorException();

      await this.userSettingsRepository.update(
        {
          phoneVerificationCode: null,
          verificationCodeCreatedAt: null
        },
        { where: { userId } }
      );
    }

    this.postsClient.emit('delete_post', new DeletePostEvent({ ...payload }));

    return new ResponseDto();
  }

  async updatePost({
    payload,
    userId,
    postId
  }: {
    payload: UpdatePostDto;
    userId: string;
    postId: string;
  }) {
    const post = await this.postRepository.findByPk(postId);

    if (!post) throw new PostNotFoundException();

    if (userId !== post.userId)
      throw new BadRequestException('wrong-user', 'Wrong user');

    this.postsClient.emit(
      'update_post',
      new UpdatePostEvent({ ...payload, postId })
    );

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
