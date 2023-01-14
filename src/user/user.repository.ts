import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import User from "./entity/user.entity";

@Injectable()
export class UserRepository extends Repository<User> {

  public findByEmail(email: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }

  public findById(id: string, pw: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('id = :id', { id })
      .andWhere('pw = :pw', { pw })
      .getOne();
  }
}
