import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "../../user/entity/user.entity";
import Post from "./post.entity";

@Entity('comment')
export default class Comment {

  @PrimaryGeneratedColumn()
  id!: string;

  @RelationId((comment: Comment) => comment.user)
  userEmail!: string;

  @RelationId((comment: Comment) => comment.post)
  postId!: string;

  @Column()
  content!: string;

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