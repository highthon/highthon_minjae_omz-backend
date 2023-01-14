import { IsNumber, IsString } from "class-validator";

export class EnviromentVariables {

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_DATABASE: string;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRE: number;
}