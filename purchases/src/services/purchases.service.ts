import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
  customer_id: string;
  product_id: string;
}
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}
  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  getPurchasesByCustomerId(customer_id: string) {
    return this.prisma.purchase.findMany({
      where: {
        customer_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createPurchase({ customer_id, product_id }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return await this.prisma.purchase.create({
      data: {
        customer_id,
        product_id,
      },
    });
  }
}
