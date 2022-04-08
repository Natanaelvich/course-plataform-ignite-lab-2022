import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';

import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.product_id);
  }
}
