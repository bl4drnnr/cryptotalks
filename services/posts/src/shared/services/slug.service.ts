import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugService {
  createSlug(postName: string) {
    return postName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[-]+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
