import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'BoardId is required' })
  @IsString({ message: 'BoardId must be a string' })
  @IsUUID(4, { message: 'BoardId must be a valid UUID' })
  boardId: string;
}
