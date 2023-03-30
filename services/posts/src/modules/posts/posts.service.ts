import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { DeletePostEventDto } from '@event-dto/delete-post-event.dto';
import { UpdatePostEventDto } from '@event-dto/update-post-event.dto';
import { SlugService } from '@shared/slug.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly slugService: SlugService,
    @InjectModel(Post) private readonly postRepository: typeof Post
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
}
