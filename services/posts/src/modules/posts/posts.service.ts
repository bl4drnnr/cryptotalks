import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { SlugService } from '@shared/slug.service';
import { InformationLog } from '@mongo-schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';
import { PostInfo } from '@models/post-info.model';
import { DeletePostEventDto } from '@events/delete-post.event';
import { UpdatePostEventDto } from '@events/update-post.event';
import { LeaveCommentEventDto } from '@events/leave-comment.event';
import { LogEventDto } from '@events/log.event';
import * as uuid from 'uuid';
import { UpdatePostInfoEventDto } from '@events/update-post-info.event';

@Injectable()
export class PostsService {
  constructor(
    private readonly slugService: SlugService,
    @InjectModel(Post) private readonly postRepository: typeof Post,
    @InjectModel(PostInfo) private readonly postInfoRepository: typeof PostInfo,
    @InjectModelMongo(InformationLog.name)
    private readonly logger: Model<InformationLog>
  ) {}

  async postCreated(payload: CreatePostDto) {
    const post = await this.postRepository.create(
      {
        ...payload,
        slug: this.slugService.createSlug(payload.title)
      },
      { returning: true }
    );
    return await this.postInfoRepository.create({
      postId: post.id
    });
  }

  deletePost({ id }: DeletePostEventDto) {
    return this.postRepository.destroy({
      where: { id }
    });
  }

  updatePost({
    title,
    postId,
    content,
    preview,
    searchTags
  }: UpdatePostEventDto) {
    const updatedFields = { content, preview, searchTags };

    if (title) {
      updatedFields['title'] = title;
      updatedFields['slug'] = this.slugService.createSlug(title);
    }

    return this.postRepository.update(
      { ...updatedFields },
      { where: { id: postId } }
    );
  }

  async leaveComment(payload: LeaveCommentEventDto) {
    const post = await this.postInfoRepository.findOne({
      where: { postId: payload.postId }
    });

    return await post.update({
      comments: [
        ...post.comments,
        {
          id: uuid.v4(),
          userId: payload.userId,
          username: payload.username,
          commentRates: [],
          payload: payload.comment,
          createdAt: new Date()
        }
      ]
    });
  }

  async updatePostInfo(payload: UpdatePostInfoEventDto) {
    const postInfo = await this.postInfoRepository.findOne({
      where: { postId: payload.postId }
    });

    if (payload.postId && payload.commentId) {
      const postComments = postInfo.comments;
      const commentToRate = postComments.find(
        (comment) => comment.id === payload.commentId
      );
      let updatingCommentRate;

      commentToRate.commentRates.forEach((commentRate) => {
        updatingCommentRate =
          commentRate.userId === payload.userId ? commentRate : null;
      });

      if (updatingCommentRate) {
        if (updatingCommentRate.rate !== payload.rate) {
          updatingCommentRate.rate = payload.rate;
          commentToRate.commentRates[
            commentToRate.commentRates.findIndex(
              (el) => el.userId === updatingCommentRate.userId
            )
          ] = updatingCommentRate;
        } else {
          const updatedCommentRate = commentToRate.commentRates.filter(
            (item) => {
              return item.userId !== payload.userId;
            }
          );

          postComments.forEach((commentItem) => {
            if (commentItem.id === payload.commentId) {
              commentItem.commentRates = updatedCommentRate;
            }
          });
        }
      } else {
        commentToRate.commentRates.push({
          rate: payload.rate,
          userId: payload.userId,
          username: payload.username
        });

        postComments[
          postComments.findIndex((el) => el.id === commentToRate.id)
        ] = commentToRate;
      }

      return await this.postInfoRepository.update(
        {
          comments: [...postComments]
        },
        { where: { id: postInfo.id } }
      );
    } else if (payload.postId && !payload.commentId) {
      const postRates = postInfo.rates;
      let userPostRate;

      postRates.forEach((postRate) => {
        userPostRate = postRate.userId === payload.userId ? postRate : null;
      });

      if (userPostRate) {
        if (userPostRate.rate !== payload.rate) {
          userPostRate.rate = payload.rate;
          postRates[postRates.findIndex((el) => el.userId === payload.userId)] =
            userPostRate;

          return await this.postInfoRepository.update(
            { rates: [...postRates] },
            { where: { id: postInfo.id } }
          );
        } else {
          const updatePostRates = postRates.filter((item) => {
            return item.userId !== payload.userId;
          });
          return await this.postInfoRepository.update(
            {
              rates: [...updatePostRates]
            },
            { where: { id: postInfo.id } }
          );
        }
      } else {
        return await this.postInfoRepository.update(
          {
            rates: [
              ...postRates,
              {
                username: payload.username,
                userId: payload.userId,
                rate: payload.rate
              }
            ]
          },
          { where: { id: postInfo.id } }
        );
      }
    }
  }

  async logPostAction(payload: LogEventDto) {
    const log = new this.logger(payload);
    await log.save();
  }
}
