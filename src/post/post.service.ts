import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Post from './entity/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) { }

  getPosts() {
    return this.postRepository.find();
  }
}
