import { IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  text: string;

  @IsPositive()
  fromId: number;

  @IsPositive()
  toId: number;
}
