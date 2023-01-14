import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Get('')
  getPosts() {
    return this.postService.getPosts();
  }
}
