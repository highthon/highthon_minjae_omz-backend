import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import PostLike from "./entity/postLike.entity";

@Injectable()
export class PostLikeRepository extends Repository<PostLike> { }
