import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Post from "../../post/entity/post.entity";
import Comment from "../../post/entity/comment.entity";

@Entity('user')
export default class User {

  @PrimaryColumn()
  email!: string;

  @Column({
    select: false
  })
  password!: string;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column({
    default: 0
  })
  point!: number;

  @OneToMany(type => Post, post => post.user)
  postList!: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comment!: Comment[];
}