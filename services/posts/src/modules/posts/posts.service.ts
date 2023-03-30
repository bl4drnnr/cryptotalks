import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { DeletePostEventDto } from '@event-dto/delete-post.event.dto';
import { UpdatePostEventDto } from '@event-dto/update-post.event.dto';
import { SlugService } from '@shared/slug.service';
import { LogEventDto } from '@event-dto/log.event.dto';
import { InformationLog } from '@mongo-schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel as InjectModelMongo } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    private readonly slugService: SlugService,
    @InjectModel(Post) private readonly postRepository: typeof Post,
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

  updatePost({ title, postId, content }: UpdatePostEventDto) {
    let updatedFields = { content };

    if (title) {
      updatedFields['title'] = title;
      updatedFields['slug'] = this.slugService.createSlug(title);
    }

    return this.postRepository.update(
      { ...updatedFields },
      { where: { id: postId } }
    );
  }

  async logPostAction(payload: LogEventDto) {
    const log = new this.logger(payload);
    await log.save();
  }
}
