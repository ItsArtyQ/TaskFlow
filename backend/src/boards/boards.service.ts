import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async boards(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BoardWhereUniqueInput;
    where?: Prisma.BoardWhereInput;
    orderBy?: Prisma.BoardOrderByWithRelationInput;
  }): Promise<Board[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.board.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBoard(data: Prisma.BoardCreateInput): Promise<Board | undefined> {
    return await this.prisma.board.create({ data });
  }

  async updateBoard(params: {
    where: Prisma.BoardWhereUniqueInput;
    data: Prisma.BoardUpdateInput;
  }): Promise<Board> {
    const { where, data } = params;
    try {
      return await this.prisma.board.update({ data, where });
    } catch {
      throw new NotFoundException('Board not found');
    }
  }

  async deleteBoard(where: Prisma.BoardWhereUniqueInput): Promise<Board> {
    try {
      return await this.prisma.board.delete({
        where,
      });
    } catch {
      throw new NotFoundException('Board not found');
    }
  }
}
