import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import Comment from "./entity/comment.entity";

@Injectable()
export class CommentRepository extends Repository<Comment> { }
