import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@/generated/prisma';

declare global {
  var globalPrisma: PrismaClient | undefined;
}

const prisma = global.globalPrisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.globalPrisma = prisma;
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  get client() {
    return prisma;
  }

  async onModuleInit() {
    await prisma.$connect();
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
