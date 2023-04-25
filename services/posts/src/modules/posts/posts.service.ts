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
    let updatedFields = { content, preview, searchTags };

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
          username: payload.username,
          commentRates: [],
          payload: payload.comment,
          createdAt: new Date()
        }
      ]
    });
  }

  ratePost(payload: any) {
    //
  }

  rateComment(payload: any) {
    //
  }

  async logPostAction(payload: LogEventDto) {
    const log = new this.logger(payload);
    await log.save();
  }
}
