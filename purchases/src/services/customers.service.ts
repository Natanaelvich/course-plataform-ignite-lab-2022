import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerParams {
  auth_user_id: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  listAllCustomers() {
    return this.prisma.customer.findMany();
  }

  getCustomersByAuthUserId(auth_user_id: string) {
    return this.prisma.customer.findUnique({ where: { auth_user_id } });
  }

  createCustomer({ auth_user_id }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        auth_user_id,
      },
    });
  }
}
