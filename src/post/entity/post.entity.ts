import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "../../user/entity/user.entity";
import Comment from "./comment.entity";
import PostLike from "./postLike.entity";

@Entity('post')
export default class Post {

  @PrimaryGeneratedColumn()
  id!: string;

  @RelationId((post: Post) => post.user)
  userEmail!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  type!: 'general' | 'vote';

  @Column({ name: 'view_count' })
  viewCount!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @JoinColumn({ name: 'user_email' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @OneToMany(type => Comment, comment => comment.post)
  commentList!: Comment[];

  @OneToMany(type => PostLike, postLike => postLike.post)
  postLikeList!: PostLike[];
}