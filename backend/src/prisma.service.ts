import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = `${process.env.DATABASE_URL}`;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined in eviroment variables');
    }
    const adapter = new PrismaPg(connectionString);
    super({ adapter });
  }
}
