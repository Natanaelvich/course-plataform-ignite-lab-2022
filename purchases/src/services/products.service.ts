import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateProductsParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(product_id: string) {
    return this.prisma.product.findUnique({ where: { id: product_id } });
  }

  async createProduct({ title }: CreateProductsParams) {
    const slug = slugify(title);

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists');
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
