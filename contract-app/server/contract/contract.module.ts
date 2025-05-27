import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Prisma } from '@/generated/prisma';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ContractController],
  providers: [ContractService, PrismaService]
})
export class ContractModule {}
