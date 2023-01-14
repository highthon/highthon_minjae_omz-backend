import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "../../user/entity/user.entity";
import Post from "./post.entity";

@Entity('post_like')
export default class PostLike {

  @PrimaryGeneratedColumn()
  id!: string;

  @RelationId((postLike: PostLike) => postLike.user)
  userEmail!: string;

  @RelationId((postLike: PostLike) => postLike.post)
  postId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @JoinColumn({ name: 'user_email' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @JoinColumn({ name: 'post_id' })
  @ManyToOne(type => Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post!: Post;
}