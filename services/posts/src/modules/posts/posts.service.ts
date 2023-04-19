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

  postCreated(payload: CreatePostDto) {
    return this.postRepository.create({
      ...payload,
      slug: this.slugService.createSlug(payload.title)
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

  leaveComment(payload: LeaveCommentEventDto) {
    return this.postInfoRepository.create({
      ...payload
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
