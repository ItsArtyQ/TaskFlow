import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, Prisma, Task } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task | undefined> {
    return await this.prisma.task.create({ data });
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    try {
      return await this.prisma.task.update({ data, where });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    try {
      return await this.prisma.task.delete({
        where,
      });
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
  async createComment(
    data: Prisma.CommentCreateInput,
  ): Promise<Comment | undefined> {
    return await this.prisma.comment.create({ data });
  }
}
