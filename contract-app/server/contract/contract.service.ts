import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ContractService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllContracts() {
    return this.prismaService.client.contract.findMany();
  }
}