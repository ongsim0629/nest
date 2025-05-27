import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ContractService {
  constructor(private readonly prismaService: PrismaService) {}

  async getContractById(contractNumber: string) {
  return this.prismaService.client.contract.findUnique({
    where: {
      contract_number: contractNumber,
    },
    include: {
      contract_center: {
        include: {
          center: true,
        },
      },
      contract_account: {
        include: {
          account: true,
        },
      },
      data: true,
    },
  });
}

  async getAllContracts() {
  return this.prismaService.client.contract.findMany({
    include: {
      contract_center: {
        include: {
          center: true,
        },
      },
      contract_account: {
        include: {
          account: true,
        },
      },
    },
  });
}
}