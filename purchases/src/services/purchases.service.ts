import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';

interface CreatePurchaseParams {
  customer_id: string;
  product_id: string;
}
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}
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

    const purchase = await this.prisma.purchase.create({
      data: {
        customer_id,
        product_id,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customer_id,
      },
    });

    //
    this.kafka.emit('purchase.new-purchase', {
      custumer: {
        authUserId: customer.auth_user_id,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
