import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ContractService {
  constructor(private readonly prismaService: PrismaService) {}

  async getContractById(contractNumber: string) {
    const contract = await this.prismaService.client.contract.findUnique({
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

    const centers = await this.prismaService.client.center.findMany();
    const accounts = await this.prismaService.client.account.findMany();

    const contractTypes = ["FIRST", "EXTEND", "CHANGE"];
    const contractMethods = ["BID", "DIRECT"];
    const contractCategories = [
      "GENERAL",
      "UNIT_PRICE",
      "LEASE",
      "CONSTRUCTION",
      "SALE",
      "SERVICE",
      "MAINTENANCE",
      "OTHER",
    ];

    return {
      contract,
      centers,
      accounts,
      enums: {
        contractTypes,
        contractMethods,
        contractCategories,
      },
    };
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
